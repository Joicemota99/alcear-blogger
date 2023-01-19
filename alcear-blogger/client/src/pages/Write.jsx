import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publicação</h1>
          <span>
            <b>Status: </b> Em andamento
          </span>
          <span>
            <b>Visibilidade: </b> Publico
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button onClick={handleClick}>Publicar</button>
          </div>
        </div>
        <div className="item">
          <h1>Categorias</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "mideaSociais"}
              name="cat"
              value="mideaSociais"
              id="mideaSociais"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="mideaSocias">Mideas Sociais</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "trafegoPago"}
              name="cat"
              value="trafegoPago"
              id="trafegoPago"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="trafegoPago">Tráfego Pago</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "tecnologia"}
              name="cat"
              value="tecnologia"
              id="tecnologia"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="tecnologia">Tecnologia</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "branding"}
              name="cat"
              value="branding"
              id="branding"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="branding">Branding</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
