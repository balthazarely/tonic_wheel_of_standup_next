import type { NextPage } from "next";
import Head from "next/head";
import { PageWrapper } from "../components/Layout/PageWrapper";
import axios from "axios";
import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import toast from "react-simple-toasts";

const Lineup: NextPage = () => {
  const [people, setPeople] = useState<any[]>([]);
  const [changesMade, setChangesMade] = useState<boolean>(false);
  const [sendingData, setSendingData] = useState<boolean>(false);

  async function getPeople() {
    let response = await axios.get(
      "https://wheelofstandup-api-dev.azurewebsites.net" + "/People"
    );
    let people = await response.data.map((person: any) => person);
    setPeople(people);
    console.log(people);
  }

  function addPeopleToEditArray(e: any, id: any) {
    setChangesMade(true);
    let updatedList = people.map((item) => {
      if (item.id === id) {
        return { ...item, isEnabled: e.target.checked }; //gets everything that was already in item, and updates "done"
      }
      return item; // else return unmodified item
    });
    setPeople(updatedList);
  }

  function updateDb() {
    if (!changesMade) {
      return;
    }
    people.forEach((person: any) => {
      if (person.isEnabled) {
        axios.post(
          `https://wheelofstandup-api-dev.azurewebsites.net/People/${person.id}/enable`
        );
      }
      if (!person.isEnabled) {
        axios.post(
          `https://wheelofstandup-api-dev.azurewebsites.net/People/${person.id}/disable`
        );
      }
    });
    setChangesMade(false);
    toast("Lineup has been saved!");
  }

  function AddNameToTeam(e: any) {
    // Need posdt request
    // Need valiadation
    if (e.key === "Enter") {
      let doesNameExist = people.some(
        (item) => item.name === e.currentTarget.value
      );
      if (!doesNameExist) {
        console.log("name doesn't exist! we should add it");
      } else {
        console.log("name is already in the array");
      }
    }
  }

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div>
      <Head>
        <title>Wheel Of Standup - Lineup</title>
        <meta name="description" content="The Wheel Of Standup" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-8">
        <PageWrapper>
          <div className="mb-4 w-full flex justify-end ">
            <button
              onClick={updateDb}
              className={` loadingtext-white transition-all duration-200 w-28 cursor-pointer text-lg px-5 py-1 ${
                changesMade
                  ? "bg-tonic-base hover:bg-tonic-baseDark"
                  : "bg-gray-500"
              }`}
            >
              Save
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div>
              <div className="text-xl mb-2 w-full border-b-2 border-gray-500">
                Team
              </div>
              <div className="people__list ">
                {people.map((person) => (
                  <div
                    className=" py-1 group flex items-center justify-between bg-transparent bg-opacity-20 hover:bg-opacity-20 hover:bg-gray-500 duration-200 transition"
                    key={person.id}
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={person.isEnabled}
                        onChange={(e) => addPeopleToEditArray(e, person.id)}
                        className="toggle mr-3 toggle-sm"
                      />
                      <span className="label-text text-base">
                        {person.name}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <button className="opacity-0  duration-200 transition bg-transparent hover:bg-tonic-base group-hover:opacity-100 text-sm border-2 border-gray-500 px-4 ">
                        Edit
                      </button>
                      <button className="opacity-0  duration-200 transition bg-transparent hover:bg-tonic-base group-hover:opacity-100 text-sm border-2 border-gray-500 px-4 ">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-0 w-full">
                  <label className="label"></label>
                  <input
                    type="text"
                    placeholder="Add new team member"
                    className="input w-full"
                    onKeyDown={(e) => AddNameToTeam(e)}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="text-xl mb-2 w-full border-b-2 border-gray-500">
                Team
              </div>
              <div className="grid grid-cols-2 gap-4 ">Share Link</div>
            </div>
          </div>
        </PageWrapper>
      </div>
    </div>
  );
};

export default Lineup;
