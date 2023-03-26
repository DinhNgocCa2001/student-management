import React, { useEffect, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

export default function Detail(props) {

    //const { aStudent, SaveDetail } = props;
    const [aStudent, setAStudent] = useState(props.aStudent);

    const [detail, setDetail] = useState();

    useEffect(() => {
        if (aStudent) {
            setDetail(aStudent)
        }
    }, [aStudent])

    // console.log("44444444444444", aStudent)
    // //debugger

    // console.log("1111111111111111", detail);

    const onChangeDetail = (value, prop) => {
        let _detail = { ...detail };
        _detail[prop] = value;
        console.log(_detail);
        setDetail(_detail);
    }
    //console.log("222222222222222222", detail);

    props.SaveDetail(detail);

    return (
        <div>
            <div className="block-input">
                <span>Name: </span>
                <InputText className="input-fix"
                    defaultValue={aStudent.name}
                    onChange={(e) => onChangeDetail(e.target.value, "name")}
                ></InputText>
            </div>

            <div className="block-input">
                <span>Class: </span>
                <InputText className="input-fix"
                    defaultValue={aStudent.class}
                    onChange={(e) => onChangeDetail(e.target.value, "class")}
                ></InputText>
            </div>

            <div className="block-input">
                <span>Point: </span>
                <InputNumber className="input-fix"
                    value={aStudent.point}
                    onValueChange={(e) => onChangeDetail(e.target.value, "point")}
                    min={0} max={10}
                ></InputNumber>
            </div>
        </div>
    )
}