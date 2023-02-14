import { createContext, useState, useContext } from "react";
import Papa from "papaparse";
export const ModalContext = createContext();
function ModalProvider({ children }) {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showDownloadBtn, setShownLoadBtn] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target.result;
      const lines = csv.split(/\r\n|\n/);
      let headers = lines[0].split(",");
      headers = headers[0].split(";");
      const data = lines.slice(1).map((line) => {
        const values = line.split(";");
        return headers.reduce((obj, header, i) => {
          obj[header] = values[i];
          return obj;
        }, {});
      });

      setData(data);
      setHeaders(headers);
      console.log(data);
    };
    reader.readAsText(file);
    setShownLoadBtn(true);
  };

  const handleDownload = () => {
    const csvData = Papa.unparse({
      fields: headers,
      data: data,
    });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDelete = (index) => {
    setData(data.filter((item, i) => i !== index));
  };
  const handleEdit = (index) => {
    setEditRow(index);
    setModalData(data[index]);
    setShowModal(true);
  };

  const handleSave = () => {
    setData(
      data.map((row, i) => {
        if (i === editRow) {
          return modalData;
        }
        return row;
      })
    );
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleModalDataChange = (e) => {
    setModalData({
      ...modalData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <ModalContext.Provider
      value={{
        data,
        setData,
        headers,
        setHeaders,
        editRow,
        setEditRow,
        showModal,
        setShowModal,
        modalData,
        setModalData,
        handleDelete,
        handleDownload,
        handleEdit,
        handleFileUpload,
        handleModalDataChange,
        handleSave,
        showDownloadBtn,
        handleCancel,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
export function useModalContext() {
  return useContext(ModalContext);
}
