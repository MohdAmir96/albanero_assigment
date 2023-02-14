import React, { useState } from "react";
import "./CsvUploader.css";
import { useModalContext } from "../context/ModalContext";
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md'
function CsvUploader() {
  const {
    data,
    headers,
    showModal,
    modalData,
    handleDelete,
    handleDownload,
    handleEdit,
    handleFileUpload,
    handleModalDataChange,
    handleSave,
    handleCancel,
    showDownloadBtn
  } = useModalContext();

  return (
    <div className="csv-upload-container">
      <h2>Upload and download CSV</h2>
      <div style={{ width: "95%" }}>
        <label htmlFor="">Upload CSV here</label>  <input style={{ marginBottom: "20px" }} type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
      <table>

        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
              <td style={{ width: "150px" }}>
                <span onClick={() => handleEdit(index)}><FaRegEdit style={{ scale: "1.5", margin: "10px", cursor: "pointer" }} /></span>
                <span onClick={() => handleDelete(index)}><MdDelete style={{ scale: "1.5", margin: "10px", cursor: "pointer" }} /></span>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
      <div style={{ width: "90%" }}>
        {

          showDownloadBtn &&
          <button style={{ marginTop: "20px" }} className="btn" onClick={handleDownload}>Download CSV</button>
        }
      </div>
      {showModal && (
        <div className="edit_modal">
          {headers.map((header) => (
            <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }} key={header}>

              <label htmlFor={header}>{header}:</label>

              <input
                type="text"
                name={header}
                id={header}
                value={modalData[header]}
                onChange={handleModalDataChange}
                style={{ marginLeft: "5px", outline: "none", width: "200px", height: "20px" }}
              />

            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button className="btn" style={{ height: "30px" }} onClick={handleSave}>Save</button>
            <button className="btn" style={{ height: "30px" }} onClick={handleCancel}>Cancel</button>

          </div>

        </div>

      )}
      <div>
      </div>
    </div>
  );
}
export default CsvUploader;
