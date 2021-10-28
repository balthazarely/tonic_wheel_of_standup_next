import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface TeamlProps {
  updateAll: boolean;
  updateAllDb: () => void;
  people: any[];
  addPeopleToEditArray: (e: any, id: string) => void;
  deleteTeamMember: (id: string) => void;
  addNewTeamMember: (e: any) => void;
  setNewName: (e: any) => void;
  newName: string;
  showErrorMsg: boolean;
  lineupInit: boolean;
}

export const Team = ({
  updateAll,
  updateAllDb,
  people,
  addPeopleToEditArray,
  deleteTeamMember,
  addNewTeamMember,
  setNewName,
  newName,
  showErrorMsg,
  lineupInit,
}: TeamlProps) => {
  return (
    <div>
      <div className=" mb-2 flex justify-between w-full border-b-2 border-gray-500">
        <div className="text-xl">Team</div>
        <div className="text-sm">
          <span>Select All </span>
          <input
            type="checkbox"
            checked={updateAll}
            onChange={updateAllDb}
            className="toggle mr-3 toggle-xs"
          />
        </div>
      </div>
      <div>
        <div className="mt-0 w-full">
          <label className="label"></label>
          <input
            type="text"
            placeholder="Add new team member"
            className={`input input-sm w-full ${
              showErrorMsg && " input-error"
            }`}
            onKeyUp={(e) => addNewTeamMember(e)}
            onChange={(e) => setNewName(e.currentTarget.value)}
            // maxLength="15"
            value={newName}
          />
          <div
            className={`error mt-2 text-sm text-red-400 transition duration-200
              ${showErrorMsg ? "opacity-100" : "opacity-0"} `}
          >
            Name already exisits
          </div>
        </div>
      </div>
      {lineupInit ? (
        <div className="people__list flex flex-wrap -mt-3 ">
          {people.map((person) => (
            <div
              className="py-2 group px-1 w-1/2 flex items-center justify-between bg-transparent bg-opacity-20 hover:bg-opacity-20 hover:bg-gray-500 duration-200 transition"
              key={person.id}
            >
              <div className="flex  items-center justify-between ">
                <input
                  type="checkbox"
                  checked={person.isEnabled}
                  onChange={(e) => addPeopleToEditArray(e, person.id)}
                  className="toggle mr-3 toggle-md"
                />
                <span className="label-text text-base">{person.name}</span>
              </div>
              <button
                onClick={() => deleteTeamMember(person.id)}
                className="opacity-0  duration-200 transition bg-transparent hover:bg-gray-400 group-hover:opacity-100 text-xs px-2 py-1 mr-3 "
              >
                X
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className=" w-100 h-48 flex items-center justify-center">
          <ClipLoader color="white" loading={true} size={36} />
        </div>
      )}
    </div>
  );
};
