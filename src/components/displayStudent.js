import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
// import { Toast } from 'primereact/toast';
// import { ConfirmDialog } from 'primereact/confirmdialog';
// import { confirmDialog } from 'primereact/confirmdialog';

import DetailStudent from "./detailStudent";


export default function DisplayStudent() {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [detail, setDetail] = useState({});

    //gọi lần đầu
    useEffect(
        () => {
            loadData()
        }, [])

    //còn nếu khi add hay update muốn load lại data thì gọi lại hàm loadData luôn, nó sẽ bớt được 1 biến state
    const loadData = () => {
        let _data = JSON.parse(localStorage.getItem("data_student"));
        setData(_data);
    }

    //Add student
    const ClickAddHandle = () => {

        setVisible(true);
        setDetail({
            name: "",
            class: "",
            point: '',
        })
    }

    //Update student
    const ClickUpdateHandle = (rowData) => {
        setDetail(rowData);
        setVisible(true);
    }

    //Delete student
    const DeleteHandle = (rowData) => {
        let _data = [...data];
        for (let i = 0; i < _data.length; i++) {
            if (rowData.id === _data[i].id) {
                _data.splice(i, 1);
            }
        }
        localStorage.setItem("data_student", JSON.stringify(_data));
        loadData();
    }

    const submitDetail = (type, value) => {

        //clone data
        let local_data = [];
        //
        if (data) {
            local_data = [...data];
        }

        //

        if (type === "create") {
            let _data = { ...value };
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
            loadData();
            setVisible(false)

            setDetail({
                name: "",
                class: "",
                point: '',
            })
        }
        else {
            for (let i = 0; i < local_data.length; i++) {
                if (local_data[i].id === value.id) {
                    local_data[i].name = value.name;
                    local_data[i].class = value.class;
                    local_data[i].point = value.point;

                    let point = value.point;
                    if (point > 8 && point < 11) local_data[i].grade = "Xuất sắc";
                    if (point > 6 && point < 9) local_data[i].grade = "Tốt";
                    if (point > 4 && point < 7) local_data[i].grade = "Trung bình";
                    if (point < 5) local_data[i].grade = "Kém";
                }
            }
            localStorage.setItem("data_student", JSON.stringify(local_data));

            loadData();
            setVisible(false);
            setDetail({
                name: "",
                class: "",
                point: '',
            })
        }
    }

    //Render column end
    const renderColEnd = (rowData) => {
        return (
            <>
                <Button className="fix-button" onClick={() => { ClickUpdateHandle(rowData) }} >Update</Button>
                <Button className="fix-button" onClick={() => { DeleteHandle(rowData) }}>Delete</Button>
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

            <Button className="fix-button" label="New Student" onClick={() => ClickAddHandle()}></Button>

            <div>
                <Dialog
                    header="Detail"
                    visible={visible}
                    style={{ width: "50vw" }}
                    onHide={() => setVisible(false)}
                >
                    <DetailStudent value={detail} submitDetail={submitDetail}></DetailStudent>
                </Dialog>
            </div>
        </>
    )
}