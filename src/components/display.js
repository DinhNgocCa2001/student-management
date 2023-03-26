import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Detail from "./detail";


export default function Display() {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [detail, setDetail] = useState({});
    const [submit, setSubmit] = useState(false);
    const [isNew, setIsNew] = useState(false);
    useEffect(
        () => {
            let _data = JSON.parse(localStorage.getItem("data_student"));
            setData(_data);
        }
        , [submit])

    const SaveDetail = (value) => {
        setDetail(value);
    }

    const ClickUpdateHandle = (rowData) => {
        setDetail(rowData);
        setVisible(true);
        setIsNew(false);
    }

    const ClickAddHandle = () => {

        setVisible(true);
        setIsNew(true);
        setDetail({
            name: "",
            class: "",
            point: '',
        })
    }

    const AddHandle = (aStudent) => {
        let local_data = [];
        local_data = [...data];
        let _data = { ...aStudent };
        _data.id = Math.floor(Math.random() * 1000000);
        if (typeof (_data.point) === "undefined") { _data.point = 0 };

        let point = _data.point;
        if (point > 8 && point < 11) _data.grade = "Xuất sắc";
        if (point > 6 && point < 9) _data.grade = "Tốt";
        if (point > 4 && point < 7) _data.grade = "Trung bình";
        if (point < 5) _data.grade = "Kém";


        if (local_data.length === 0) {
            localStorage.setItem("data_student", JSON.stringify([_data]));
        } else {
            local_data.push(_data);
            localStorage.setItem("data_student", JSON.stringify(local_data));
        }
        setSubmit(!submit);
        setVisible(false);
    }

    const UpdadeHandle = (aStudent) => {
        let local_data = [];
        local_data = [...data];

        for (let i = 0; i < local_data.length; i++) {
            if (local_data[i].id === aStudent.id) {
                local_data[i].name = aStudent.name;
                local_data[i].class = aStudent.class;
                local_data[i].point = aStudent.point;

                let point = aStudent.point;
                if (point > 8 && point < 11) local_data[i].grade = "Xuất sắc";
                if (point > 6 && point < 9) local_data[i].grade = "Tốt";
                if (point > 4 && point < 7) local_data[i].grade = "Trung bình";
                if (point < 5) local_data[i].grade = "Kém";
            }
        }
        localStorage.setItem("data_student", JSON.stringify(local_data));

        setSubmit(!submit);
        setVisible(false);
    }

    const DeleteHandle = (rowData) => {
        let _data = [...data];
        for (let i = 0; i < _data.length; i++) {
            if (rowData.id === _data[i].id) {
                _data.splice(i, 1);
            }
        }
        localStorage.setItem("data_student", JSON.stringify(_data));
        setSubmit(!submit);
    }

    const renderColEnd = (rowData) => {
        return (
            <>
                <Button onClick={() => { ClickUpdateHandle(rowData) }} >Update</Button>
                <Button onClick={() => { DeleteHandle(rowData) }}>Delete</Button>
            </>
        )
    }

    return (
        <>

            <DataTable value={data} style={{ width: "90vw" }}>
                <Column field="name" header="Name"></Column>
                <Column field="class" header="Class"></Column>
                <Column field="point" header="Point"></Column>
                <Column field="grade" header="Grade"></Column>
                <Column body={renderColEnd} header="Action"></Column>
            </DataTable>

            <Button label="New Student" onClick={() => ClickAddHandle()}></Button>

            <div>
                <Dialog
                    header="Detail"
                    visible={visible}
                    style={{ width: "50vw" }}
                    onHide={() => setVisible(false)}
                >

                    <Detail aStudent={detail} SaveDetail={SaveDetail}></Detail>
                    {isNew ?
                        <Button onClick={() => { AddHandle(detail) }} >Add</Button>
                        :
                        <Button onClick={() => { UpdadeHandle(detail) }} >Update</Button>
                    }

                </Dialog>
            </div>
        </>
    )
}