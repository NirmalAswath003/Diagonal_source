import logo from "./logo.svg";
import "./App.css";
import nw from "../src/Api/CONTENTLISTINGPAGE-PAGE1.json";
import { useEffect, useState, useRef } from "react";
import img1 from "../src/assets/posterthatismissing.png";
import Searchbar from "./components/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../src/redux/data.js";
import { getValue } from "@testing-library/user-event/dist/utils";
function App() {
  const apidata = useSelector((state) => state.data.value);
  const searchdata = useSelector((state) => state.data.seachvalue);
  const searchletter = useSelector((state) => state.data.searchletters);
  const dispatch = useDispatch();
  const [letter, setLetter] = useState(false);
  const [letter1, setLetter1] = useState(0);
  const [page1, setpage1] = useState(1);
  const [data, setdata] = useState([]);
  const [keyvaldata, setKeyvaldata] = useState([]);
  const [title, settitle] = useState("");
  const [inputbutton, setinput] = useState(false);

  useEffect(() => {
    const data1 = require(`../src/Api/CONTENTLISTINGPAGE-PAGE${page1}.json`);
    const titleofpage = data1.page["title"];
    const keyvalue = data1.page["page-num-requested"];
    const ott = data1.page["content-items"].content.map((imgname) => {
      return {
        name: imgname["name"],
        "poster-image": imgname["poster-image"],
      };
    });
    if (!keyvaldata.includes(keyvalue)) {
      setKeyvaldata((prev) => [...prev, keyvalue]);
      setdata((prev) => [...prev, ...ott]);
      settitle(titleofpage);
    }
  }, [page1]);

  useEffect(() => {
    const wrapper = document.getElementsByClassName("wrapper");
    setTimeout(() => {
      const div = document.getElementsByClassName("check");
      const div1 = document.getElementsByClassName("check1");
      if (div[0] || div1[0]) {
        setLetter1(1);
      } else {
        setLetter1(0);
      }
    }, 100);
  }, [letter]);

  const checkfun = () => {
    setTimeout(() => {
      const div = document.getElementsByClassName("check");
      const div1 = document.getElementsByClassName("check1");
      if (div[0] || div1[0]) {
        setLetter1(1);
      } else {
        setLetter1(0);
      }
    }, 100);
  };

  useEffect(() => {
    dispatch(update(data));
  }, [data]);

  useEffect(() => {
    window.onscroll = function () {
      displayWindowSize();
    };

    function displayWindowSize() {
      window.onresize = displayWindowSize;
      window.onload = displayWindowSize;
      let myWidth = window.innerWidth;
      let myHeight = window.innerHeight;
      const div = document.getElementsByClassName("wrapper");
      // div[0].style.height = myHeight + "px";
      if (myWidth < 600) {
        if (document.documentElement.scrollTop > myHeight) {
          setpage1(2);
        }
        if (document.documentElement.scrollTop > myHeight * 2) {
          setpage1(3);
        }
      } else if (myWidth <= 768 && myWidth > 600) {
        if (document.documentElement.scrollTop > 100) {
          setpage1(2);
        }
        if (document.documentElement.scrollTop > 1340) {
          setpage1(3);
        }
      } else if (myWidth <= 1024 && myWidth > 768) {
        if (document.documentElement.scrollTop > 130) {
          setpage1(2);
        }
        if (document.documentElement.scrollTop > 1340) {
          setpage1(3);
        }
      } else if (myWidth <= 1200 && myWidth > 1024) {
        if (document.documentElement.scrollTop > 180) {
          setpage1(2);
        }
        if (document.documentElement.scrollTop > 1100) {
          setpage1(3);
        }
      } else if (myWidth > 1201) {
        if (document.documentElement.scrollTop > 180) {
          setpage1(2);
        }
        if (document.documentElement.scrollTop > 1140) {
          setpage1(3);
        }
      }
    }
  }, [window.onscroll]);

  return (
    <div className="max-w-l mx-auto bg-black shadow-md overflow-hidden l:max-w-2xl">
      <nav className="fixed py-1 bg-black text-black-500 hover:text-gray-700 focus:text-gray-700 w-full shadow-2xl">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
          <div className="container-fluid flex w-full">
            <div className="float-left mt-3 w-full">
              <span className="float-left mr-3">
                <img
                  className="w-7 h-7 ..."
                  src={require("../src/assets/Back.png")}
                ></img>
              </span>
              <span>
                {inputbutton ? (
                  ""
                ) : (
                  <span className="mt-0 mb-4 text-xl text-white">{title}</span>
                )}
              </span>
            </div>
            <div className="float-right position-fixed mt-2">
              <Searchbar
                inputbutton={inputbutton}
                setButton={setinput}
                letter={letter}
                setLetter={setLetter}
              ></Searchbar>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`${
          letter1 === 1
            ? "grid wrapper md:grid-cols-5 mt-43 xl:grid-cols-7 sm:grid-cols-3 md:gap-3 xl:gap-2 sm:gap-2 grid-cols-3 grid-gap-5"
            : "h-46 bg-black"
        }`}
      >
        <div
          className={`${
            letter1 === 1 ? "hidden" : "text-white mt-47 flex justify-center"
          }`}
        >
          No Matching Result Found
        </div>
        {searchletter.length === 0 &&
          apidata.length === 1 &&
          apidata[0].map((elem, id) => {
            let image_path = "";
            try {
              image_path = require(`../src/assets/${elem["poster-image"]}`);
            } catch (e) {
              var filename = elem["poster-image"];
              var text =
                filename.slice(0, elem["poster-image"].length - 4) + ".png";
            }
            return (
              <div
                className="flex justify-center mr-41 ml-41 mb-45 check"
                key={id}
              >
                <div className="max-w-sm overflow-hidden shadow-lg">
                  <img
                    className=" h-30 w-50 object-cover"
                    src={
                      image_path.length > 0
                        ? image_path
                        : require("../src/assets/" + text)
                    }
                    // src={img1}
                  />
                  <div className="py-0">
                    <p className="text-left text-white text-base ml-2 mt-3">{`${
                      elem.name.length > 15
                        ? elem.name.substring(0, 11) + ".."
                        : elem.name
                    }`}</p>
                  </div>
                </div>
              </div>
            );
          })}
        {searchdata.length === 1 &&
          searchletter.length > 0 &&
          searchdata[0]
            .filter((elm) => {
              var nameoffilm = elm.name.toLowerCase();
              if (nameoffilm.includes(searchletter[0].toLowerCase())) {
                return true;
              }
              return false;
            })
            .map((elem, id) => {
              let image_path = "";
              try {
                image_path = require(`../src/assets/${elem["poster-image"]}`);
              } catch (e) {
                var filename = elem["poster-image"];
                var text =
                  filename.slice(0, elem["poster-image"].length - 4) + ".png";
              }
              return (
                <div
                  className="flex justify-center mr-41 ml-41 mb-45 check1"
                  key={id + 100}
                >
                  <div className="max-w-sm  overflow-hidden shadow-lg">
                    <img
                      className=" h-30 w-50 object-contain"
                      src={
                        image_path.length > 0
                          ? image_path
                          : require("../src/assets/" + text)
                      }
                      // src={img1}
                      alt="Sunset in the mountains"
                    />
                    <div className="py-0">
                      <p className="text-left text-white text-base ml-2 mt-3">{`${
                        elem.name.length > 15
                          ? elem.name.substring(0, 11) + ".."
                          : elem.name
                      }`}</p>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default App;
