import React, { useEffect, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
import "./detailStudent.css";

export default function DetailStudent(props) {

    const { value, submitDetail } = props;

    const [type, setType] = useState("create");

    const [detail, setDetail] = useState({ name: "", class: "", point: '' });

    const [isNull, setIsNull] = useState(true);

    const [message, setMessage] = useState("");

    let _message = "";
    useEffect(() => {
        if (value.id) {
            setType("update");
            setIsNull(false);
            setDetail(value);
        }
    }, [value])

    const validate = (value) => {
        if (!value.name) _message += "Tên không được bỏ trống\n";
        if (!value.class) _message += "Lớp không được bỏ trống\n";
        if (value.point < 0 || value.point > 10 || !value.point) _message += "Điểm không được bỏ trống và trong khoảng 0 <= point <= 10\n";
        (!_message) ? setIsNull(false) : setIsNull(true);
        setMessage(_message);
        //_message = "";
    }

    const onChangeDetail = (value, prop) => {
        let _detail = { ...detail };
        _detail[prop] = value;

        validate(_detail);
        console.log(_detail);
        setDetail(_detail);
    }

    return (
        <div>

            <div>
                <small>
                    <pre className="danger-color">{message}</pre>

                    {console.log(message)}
                </small>
            </div>
            <div className="block-input">
                <span className="fix-span">Name: </span>
                <InputText className="fix-input"
                    defaultValue={value.name}
                    onChange={(e) => onChangeDetail(e.target.value, "name")}
                ></InputText>
            </div>

            <div className="block-input">
                <span className="fix-span">Class: </span>
                <InputText className="fix-input"
                    defaultValue={value.class}
                    onChange={(e) => onChangeDetail(e.target.value, "class")}
                ></InputText>
            </div>

            <div className="block-input">
                <span className="fix-span">Point: </span>
                {/* inputnumber sẽ bị hiện tượng value point bằng giá trị sẽ không update, và gọi callback hàm validate ngay khi vào component con */}
                <InputText className="fix-input" type="number"
                    min={0}
                    defaultValue={value.point}
                    onChange={(e) => onChangeDetail(e.target.value, "point")}
                ></InputText>
            </div>

            <Button className="fix-button" onClick={() => submitDetail(type, detail)} disabled={isNull}>Submit</Button>
        </div>
    )
}