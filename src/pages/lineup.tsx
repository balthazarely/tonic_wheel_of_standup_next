import { useEffect, useState, useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { PageWrapper } from "../components/Layout/PageWrapper";
import { Team } from "../components/Lineup/Team";
import { CopyLink } from "../components/Lineup/CopyLink";
import toast from "react-simple-toasts";
import {
  addAPerson,
  deleteAPerson,
  disableAPerson,
  enableAPerson,
  getAllPeople,
} from "../api/People";
import { GlobalContext } from "../context/SettingsContext";
import { WarningModal } from "../components/Modal/WarningModal";

const Lineup: NextPage = () => {
  const { modalOpen, openModal } = useContext(GlobalContext);
  const [lineupInit, setLineupInit] = useState<boolean>(false);
  const [people, setPeople] = useState<any[]>([]);
  const [changesMade, setChangesMade] = useState<boolean>(false);
  const [updateAll, setUpdateAll] = useState<boolean>(false);
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");

  async function getPeople() {
    let response = await getAllPeople();
    let people = await response.data.map((person: any) => person);
    setPeople(people);
    setLineupInit(true);
  }

  function addPeopleToEditArray(e: any, id: any) {
    setUpdateAll(false);
    setChangesMade(true);
    let updatedList = people.map((item) => {
      if (item.id === id) {
        return { ...item, isEnabled: e.target.checked };
      }
      return item;
    });
    setPeople(updatedList);
  }

  function updateAllDb() {
    setUpdateAll(!updateAll);
    setChangesMade(true);
    let updatedList = people.map((item) => {
      return { ...item, isEnabled: true };
    });
    setPeople(updatedList);
  }

  function updateDb() {
    let numberSelected = people.filter(
      (person: any) => person.isEnabled === true
    );

    if (numberSelected.length < 2) {
      openModal();
      return;
    }
    if (!changesMade) {
      return;
    }
    people.forEach((person: any) => {
      if (person.isEnabled) {
        enableAPerson(person.id);
      }
      if (!person.isEnabled) {
        disableAPerson(person.id);
      }
    });
    setChangesMade(false);
    setUpdateAll(false);
    toast("Lineup has been saved!");
  }

  async function addNewTeamMember(e: any) {
    let doesNameExist = people.some((item) => item.name === newName);

    if (doesNameExist) {
      setShowErrorMsg(true);
    } else {
      setShowErrorMsg(false);
      if (e.key === "Enter") {
        await updateDb();
        await addAPerson(newName);
        setShowErrorMsg(false);
        setNewName("");
        getPeople();
      }
    }
  }

  async function deleteTeamMember(id: string) {
    await deleteAPerson(id);
    getPeople();
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
            <Team
              lineupInit={lineupInit}
              updateAll={updateAll}
              updateAllDb={updateAllDb}
              people={people}
              addPeopleToEditArray={addPeopleToEditArray}
              deleteTeamMember={deleteTeamMember}
              addNewTeamMember={addNewTeamMember}
              setNewName={setNewName}
              newName={newName}
              showErrorMsg={showErrorMsg}
            />
            <CopyLink />
          </div>
        </PageWrapper>
        <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
          {modalOpen && <WarningModal />}
        </div>
      </div>
    </div>
  );
};

export default Lineup;
