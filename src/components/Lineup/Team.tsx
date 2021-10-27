import React from "react";

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
      <div className="people__list flex flex-wrap ">
        {people.map((person) => (
          <div
            className="py-1 group px-1 w-1/2 flex items-center justify-between bg-transparent bg-opacity-20 hover:bg-opacity-20 hover:bg-gray-500 duration-200 transition"
            key={person.id}
          >
            <div className="flex  items-center justify-between ">
              <input
                type="checkbox"
                checked={person.isEnabled}
                onChange={(e) => addPeopleToEditArray(e, person.id)}
                className="toggle mr-3 toggle-sm"
              />
              <span className="label-text text-base">{person.name}</span>
            </div>
            <button
              onClick={() => deleteTeamMember(person.id)}
              className="opacity-0  duration-200 transition bg-transparent hover:bg-tonic-base group-hover:opacity-100 text-xs border-2 border-gray-500 px-2 mr-3 "
            >
              X
            </button>
          </div>
        ))}
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
    </div>
  );
};
