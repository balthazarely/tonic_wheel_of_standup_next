import type { NextPage } from "next";
import Head from "next/head";
import { PageWrapper } from "../components/Layout/PageWrapper";
import axios from "axios";
import { useEffect, useState } from "react";

const Lineup: NextPage = () => {
  const [people, setPeople] = useState<any[]>([]);

  async function getPeople() {
    let response = await axios.get(
      "https://wheelofstandup-api-dev.azurewebsites.net" + "/People"
    );
    let people = await response.data.map((person: any) => person);
    setPeople(people);
    console.log(people);
  }

  async function toggleEnabled(person: any) {
    let response = await axios.post(
      `https://wheelofstandup-api-dev.azurewebsites.net/People/${person.id}/enable`
    );

    getPeople();
  }

  function addPeopleToEditArray(e: any, id: any) {
    let updatedList = people.map((item) => {
      if (item.id === id) {
        return { ...item, isEnabled: e.target.checked }; //gets everything that was already in item, and updates "done"
      }
      return item; // else return unmodified item
    });
    setPeople(updatedList);
  }

  function updateDb() {
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
      <div>
        <PageWrapper>
          <div className="grid grid-cols-3 gap-4 ">
            {people.map((person) => (
              <div className=" flex " key={person.id}>
                <span className="label-text text-lg">{person.name}</span>
                <input
                  type="checkbox"
                  checked={person.isEnabled}
                  onChange={(e) => addPeopleToEditArray(e, person.id)}
                  // onChange={(e) => toggleEnabled(person)}
                  className="toggle ml-3"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 ">
            <button
              onClick={updateDb}
              className="bg-tonic-base hover:bg-tonic-baseDark  text-white   cursor-pointer text-lg px-5 py-1"
            >
              Save
            </button>
          </div>
        </PageWrapper>
      </div>
    </div>
  );
};

export default Lineup;
