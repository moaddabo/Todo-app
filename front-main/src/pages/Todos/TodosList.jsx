import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { FiDelete } from "react-icons/fi";
// import { BsFileEarmarkPdf } from "react-icons/bs";
import { TbPdf } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../url";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import loadinggg from "../../assets/loading.gif";

const Todos = () => {
  // const Navigate = useNavigate();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [enabled, setEnabled] = useState(false);

  async function handleClick() {
    setEnabled(true);
    try {
      const res = await axios.post(`${BACKEND_URL}Todos`, {
        title,
        description,
      });
      if (res.data.message) {
        toast.info(res.data.message);
      }
      setTitle("");
      setDescription("");
      // Navigate("/");
    } catch (err) {
      toast.error(err);
    }
    setEnabled(false);
  }
  const componentRef = useRef();

  const [Todos, setTodos] = useState([]);

  async function getTodos() {
    const TodosRes = await axios.get(`${BACKEND_URL}todos`);
    setTodos(TodosRes?.data);
  }
  const handleDelete = async (id) => {
    if (id) {
      const res = await axios.delete(`${BACKEND_URL}todos/${id}`);
      toast.error(res?.data?.message);
    } else {
      toast.error(`Cant delete`);
    }
  };
  useEffect(() => {
    getTodos();
  }, [Todos]);

  const pdfRef = useRef();

  function downloadPDf() {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("todos.pdf");
    });
  }

  const pdfReff = useRef();

  return (
    <>
      <div className="container mx-auto px-4  sm:px-8">
        <div className="font-sans antialiased bg-grey-lightest">
          <div className="w-full ">
            <div className="container mx-auto py-8">
              <div className="w-5/6 lg:w-1/1 mx-auto bg-white rounded shadow-lg">
                <div className="py-4 px-8 text-black font-bold text-2xl shadow-md border-grey-lighter">
                  Todo Form
                </div>
                <div className="py-4 px-8">
                  <div
                    className="flex mb-4 flex-col lg:flex-row justify-center"
                    ref={componentRef}
                  >
                    <div className="w-1/2 mr-1">
                      <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="first_name"
                      >
                        Title
                      </label>
                      <input
                        className="appearance-none border-2  border-slate-300 outline-slate-700 rounded  py-2 px-3 text-grey-darker w-60 lg:w-full"
                        id="first_name"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="w-1/2 mr-1">
                      <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="first_name"
                      >
                        Description
                      </label>
                      <input
                        className="appearance-none border-2 border-slate-300 outline-slate-700 rounded w-60 lg:w-full py-2 px-3 text-grey-darker"
                        id="first_name"
                        type="email"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-8">
                    {enabled ? (
                      <button className="bg-transparent hover:bg-[#36454F] outline-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded">
                        <img src={loadinggg} alt="" className="h-6 min-w-fit" />
                      </button>
                    ) : (
                      <button
                        className="bg-transparent hover:bg-[#36454F] font-semibold hover:text-white py-2 px-4 border outline-slate-500 hover:border-transparent rounded"
                        onClick={handleClick}
                      >
                        Add Todo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Link
          to="/addtodo"
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Add Todo
        </Link> */}
        <div className="py-3 ">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Todo List</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-2 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <div className="flex">
                <TbPdf
                  size={24}
                  className="ml-auto cursor-pointer"
                  onClick={downloadPDf}
                />
              </div>

              <table
                className="min-w-full bg-[#36454F] leading-normal"
                ref={pdfRef}
              >
                <thead className="text-white">
                  <tr className="text-white">
                    <th className="px-5 py-3 border-b-2 text-white border-gray-200 bg-[#36454F] text-left text-xs font-semibold text-black-900 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-5 py-3 border-b-2 text-white border-gray-200 bg-[#36454F] text-left text-xs font-semibold text-black-900 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-5 py-3 border-b-2 text-white border-gray-200 bg-[#36454F] text-left text-xs font-semibold text-black-900 uppercase tracking-wider">
                      Date
                    </th>
                    <th
                      data-html2canvas-ignore="true"
                      className="px-5 py-3 border-b-2 text-white border-gray-200 bg-[#36454F] text-left text-xs font-semibold text-black-900 uppercase tracking-wider"
                    >
                      Manage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Todos.length < 0 && <p>No Todo Found.</p>}
                  {Todos &&
                    Todos.map((todo, i) => (
                      <tr
                        key={i}
                        style={{ position: "relative", top: "0", right: "0" }}
                        ref={pdfReff}
                      >
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex">
                            <div>
                              <p className="text-gray-900 font-semibold capitalize">
                                {todo.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap capitalize">
                            {todo.description}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap capitalize">
                            {new Date(todo.createdAt).toDateString()}
                          </p>
                        </td>
                        <td
                          data-html2canvas-ignore="true"
                          className="px-5 py-3 border-b border-gray-200 bg-white text-sm"
                        >
                          <p className="text-gray-900 flex min-w-2 max-h-20 whitespace-no-wrap">
                            <Link to={`/updatetodo/${todo._id}`}>
                              <GrUpdate
                                size={24}
                                className="mx-2 cursor-pointer text-[#28A5DC]"
                              />
                            </Link>

                            <FiDelete
                              size={24}
                              className="mx-2 text-[#ff0454] cursor-pointer"
                              onClick={() => handleDelete(todo && todo?._id)}
                            />
                          </p>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
