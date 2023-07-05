import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../url";
import { toast } from "react-toastify";
import loadinggg from "../../assets/loading.gif";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTodo = () => {
  const { id } = useParams();

  const Navigate = useNavigate();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const getsingleTodo = async () => {
      const res = await axios.get(`${BACKEND_URL}todos/${id}`);
      setTitle(res.data.title);
      setDescription(res.data.description);
    };
    getsingleTodo();
  }, [id]);

  async function handleClick() {
    setEnabled(true);
    try {
      const res = await axios.put(`${BACKEND_URL}todos/${id}`, {
        title,
        description,
      });
      if (res.data.message) {
        toast.info(res.data.message);
      }
      Navigate("/");
    } catch (err) {
      toast.error(err);
    }
    setEnabled(false);
  }

  return (
    <div className="font-sans antialiased bg-grey-lightest">
      <div className="w-full bg-grey-lightest">
        <div className="container mx-auto py-8">
          <div className="w-5/6 lg:w-1/1 mx-auto bg-white rounded shadow-lg">
            <div className="py-4 px-8 text-black font-bold text-2xl shadow-md border-grey-lighter">
              Update Todo
            </div>
            <div className="py-4 px-8">
              <div className="flex mb-4 flex-col lg:flex-row justify-center ">
                <div className="w-1/2 mr-1">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="first_name"
                  >
                    Title
                  </label>
                  <input
                    className="appearance-none border-2  border-slate-200 outline-slate-500 rounded  py-2 px-3 text-grey-darker w-60 lg:w-full"
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
                    className="appearance-none border-2 border-slate-200 outline-slate-500 rounded w-60 lg:w-full py-2 px-3 text-grey-darker"
                    id="first_name"
                    type="email"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-8">
                {enabled ? (
                  <button className="bg-transparent hover:bg-slate-300 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded">
                    <img src={loadinggg} alt="" className="h-6 min-w-fit" />
                  </button>
                ) : (
                  <button
                    className="bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded"
                    onClick={handleClick}
                  >
                    Update Todo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
