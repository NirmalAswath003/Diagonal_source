import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adddata, searchdata } from "../redux/data.js";

function Searchbar(props) {
  const dispatch = useDispatch();
  const [searchall, setsearch] = useState([]);
  const [alldata, setalldata] = useState([]);
  const [keyvaldata, setKeyvaldata] = useState([]);
  const [inputbutton, setinput] = useState(false);
  useEffect(() => {
    let pagenew = [1, 2, 3];
    // var dataall = [];
    for (let i = 0; i < pagenew.length; i++) {
      const data1 = require(`../Api/CONTENTLISTINGPAGE-PAGE${pagenew[i]}.json`);
      const keyvalue = data1.page["page-num-requested"];
      const ott = data1.page["content-items"].content.map((imgname) => {
        return {
          name: imgname["name"],
          "poster-image": imgname["poster-image"],
        };
      });
      if (!keyvaldata.includes(keyvalue)) {
        setKeyvaldata((prev) => [...prev, keyvalue]);
        setalldata((prev) => [...prev, ...ott]);
      }
    }
  }, []);
  useEffect(() => {
    dispatch(adddata(alldata));
  }, [keyvaldata]);
  const searchbarfunc = (value) => {
    props.setLetter(!props.letter);
    dispatch(searchdata(value));
    setsearch(value);
  };
  const showinput = () => {
    setinput(!inputbutton);
    props.setButton(!props.inputbutton);
  };
  return (
    <div className="justify-right ">
      <div className="mb-3 w-full float-right">
        <div className="flex">
          {inputbutton === true && (
            <input
              type="search"
              className="block p-4 pl-10 min-w-0 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              value={searchall}
              onChange={(e) => searchbarfunc(e.target.value)}
              aria-label="Search"
              id="searchfield"
              aria-describedby="button-addon2"
            />
          )}
          <button
            type="submit"
            onClick={showinput}
            className="p-2.5 ml-2 text-sm font-medium text-white bg-black-700 rounded-lg border border-black-700 focus:outline-none focus:ring-blue-300 dark:bg-black-600 dark:hover:bg-black-700"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
