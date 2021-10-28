import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { Spinner } from "./Spinner";
import Pusher from "pusher-js";
import { SpinnerBtn } from "./SpinnerBtn";
import { SpinnerInfo } from "./SpinnerInfo";
import { calculateSpinnerDistance, duplicateArr } from "../Utilities/Utilities";
import { spinnerWrapperDimensions } from "./Spinner.styles";
import toast from "react-simple-toasts";
import { getAllPeople } from "../../api/People";
import ClipLoader from "react-spinners/ClipLoader";

export const SpinnerWrapper = () => {
  // non-state variables
  let moveDistance: number | undefined;
  // Spinner, Etc. State
  const [rotations, setRotations] = useState<number>(7);
  const [duration, setDuration] = useState<number>(1);
  const [ease, setEase] = useState<string>("power4.inOut");
  // Game States
  const [pusherSubscribed, setPusherSubscribed] = useState<boolean>(false);

  const [staticNameArray, setStaticNameArray] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string>("");
  const [newPersonSelected, setNewPersonSelected] = useState<any>();
  const [peopleWhoHaveGone, setPeopleWhoHaveGone] = useState<any>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  async function getPeople() {
    let response = await getAllPeople();
    let people = await response.data
      .filter((person: any) => person.isEnabled)
      .map((person: any) => person.name);
    let peopleMultiplied = duplicateArr(people);
    setStaticNameArray(peopleMultiplied);
    setCurrentSelection(people[6]);
  }

  async function spinWheel() {
    if (pusherSubscribed && !isSpinning && !gsap.isTweening(".box")) {
      setIsSpinning(true);
      await axios.post(
        "https://wheelofstandup-api-dev.azurewebsites.net" + "/Wheel/spin"
      );
      setIsGameActive(true);
    }
  }

  function calculateWheelAnimation() {
    moveDistance = calculateSpinnerDistance(
      currentSelection,
      newPersonSelected,
      rotations,
      staticNameArray
    );
    setCurrentSelection(newPersonSelected);
  }

  async function animateWheel() {
    const tl = gsap.timeline();
    tl.to(".box", duration, {
      ease: ease,
      y: `+=${moveDistance}`,
      modifiers: {
        y: (y: any) => (parseFloat(y) % (staticNameArray.length * 40)) + "px",
      },
    }).call(() => {
      setIsSpinning(false);
    });
  }

  async function resetWheel() {
    await axios.post(
      "https://wheelofstandup-api-dev.azurewebsites.net" + "/Wheel/reset"
    );
    setPeopleWhoHaveGone([]);
    getPeople();
    setGameOver(false);
    setIsGameActive(false);
    toast("Wheel has been reset!");
  }

  useEffect(() => {
    calculateWheelAnimation();
    animateWheel();
  }, [newPersonSelected]);

  useEffect(() => {
    getPeople();
    resetWheel();
    const pusher = new Pusher("02ed6b5e8ce8b8b7f8a2", {
      cluster: "us3",
    });
    const channel = pusher.subscribe("spin");

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("sub is succeded");
      setPusherSubscribed(true);
    });

    channel.bind("person-selected", (data: any) => {
      let parsed = JSON.parse(data);
      setNewPersonSelected(parsed.SelectedPerson.Name);
      console.log(parsed.SelectedPerson.Name);
      setPeopleWhoHaveGone(parsed.PeopleWhoHaveGone);
      // TODO need to get all the people who have gone on mount, not just when the spinner spins.
    });
    channel.bind("all-done", (data: any) => {
      setGameOver(true);
    });
    channel.bind("pusher:subscription_error", function (status: any) {
      console.log(status);
    });
    return () => {
      pusher.unsubscribe("channel");
    };
  }, []);

  useEffect(() => {
    gsap.set(".box", {
      y: (i: number) => i * 40,
    });
  }, [staticNameArray]);

  return (
    <div className="flex md:flex-row flex-col gap-6 ">
      <div className="flex-1 ">
        <SpinnerBtn
          nextButtonClick={spinWheel}
          isGameActive={isGameActive}
          isSpinning={isSpinning}
          gameOver={gameOver}
          pusherSubscribed={pusherSubscribed}
        />
        <div
          className=" flex-1 w-full h-full flex flex-col items-center justify-center  overflow-hidden relative  "
          style={spinnerWrapperDimensions}
        >
          <Spinner
            staticNameArray={staticNameArray}
            currentName={currentSelection!}
            whoHasGoneArray={peopleWhoHaveGone}
          />
        </div>
      </div>
      <div className=" flex-1 ">
        <SpinnerInfo
          resetWheel={resetWheel}
          gameOver={gameOver}
          isSpinning={isSpinning}
          currentName={currentSelection!}
          isGameActive={isGameActive}
          whoHasGoneArray={peopleWhoHaveGone}
        />
      </div>
      {/* <div className="md:flex-row flex-col flex gap-8  ">
        <div
          className=" flex-1 w-full h-full flex flex-col items-center justify-center  overflow-hidden relative bord "
          style={spinnerWrapperDimensions}
        >
          <Spinner
            staticNameArray={staticNameArray}
            currentName={currentSelection!}
            whoHasGoneArray={peopleWhoHaveGone}
          />
        </div>
        <SpinnerInfo
          resetWheel={resetWheel}
          gameOver={gameOver}
          isSpinning={isSpinning}
          currentName={currentSelection!}
          isGameActive={isGameActive}
          whoHasGoneArray={peopleWhoHaveGone}
        />
      </div> */}
    </div>
  );
};
