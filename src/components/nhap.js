import React, { useEffect, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
import "./detailStudent.css";

export default function DetailStudent(props) {

    const { value, submitDetail } = props;

    const [type, setType] = useState("create");

    const [detail, setDetail] = useState({ name: "", class: "", point: '' });

    const [message, setMessage] = useState({ name: "", class: "", point: '' });

    useEffect(() => {
        if (value.id) {
            setType("update");
            setDetail(value);
        }
    }, [value])

    const validate = (value) => {
        let _message = { ...message };
        !value.name ? _message.name = "Tên không được bỏ trống" : _message.name = "";
        !value.class ? _message.class = "Lớp không được bỏ trống" : _message.class = "";
        (value.point < 0 || value.point > 10 || !value.point) ? _message.point = "Điểm không được bỏ trống và trong khoảng 0 <= point <= 10" : _message.point = "";

        setMessage(_message);

        console.log("666666666666666666666666", _message);
        if (!_message.name && !_message.class && !_message.point) {
            return true;
        }
        // else {
        //     return false;
        // }
    }

    const onChangeDetail = (value, prop) => {
        let _detail = { ...detail };
        _detail[prop] = value;

        validate(_detail);
        console.log(_detail);
        setDetail(_detail);
    }

    //sửa từ đây ddddddddddddddddddddddddddddddddddddddd

    const clickSubmitHandle = () => {
        //validate(detail);

        if (validate(detail)) {
            submitDetail(type, detail)
        }
        else {
            validate(detail)
        }
    }

    return (
        <div>
            <div className="block-input">
                <span className="fix-span">Name: </span>
                <InputText className="fix-input"
                    defaultValue={value.name}
                    onChange={(e) => onChangeDetail(e.target.value, "name")}
                ></InputText>
            </div>

            <div className="block-input">
                <span className="fix-span"></span>
                <small className="fix-input">{message.name}</small>
            </div>

            <div className="block-input">
                <span className="fix-span">Class: </span>
                <InputText className="fix-input"
                    defaultValue={value.class}
                    onChange={(e) => onChangeDetail(e.target.value, "class")}
                ></InputText>
            </div>
            <div className="block-input">
                <span className="fix-span"></span>
                <small className="fix-input">{message.class}</small>
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
            <div className="block-input">
                <span className="fix-span"></span>
                <small className="fix-input">{message.point}</small>
            </div>

            <Button className="fix-button" onClick={() => clickSubmitHandle()}>Submit</Button>
        </div>
    )
}


//code 11:28 pm
import React, { useEffect, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
import "./detailStudent.css";

export default function DetailStudent(props) {

    const { value, submitDetail } = props;

    const [type, setType] = useState("create");

    const [detail, setDetail] = useState({ name: "", class: "", point: '' });

    const [message, setMessage] = useState({ name: null, class: null, point: null });

    //const [valid, setValid] = useState(false);

    useEffect(() => {
        if (value.id) {
            setType("update");
            setDetail(value);
        }
    }, [value])

    const validate = (value, props) => {

        let _message = { ...message };
        switch (props) {
            case "name":
                !value ? _message.name = "Tên không được bỏ trống" : _message.name = "";
                break;
            case "class":
                !value ? _message.class = "Lớp không được bỏ trống" : _message.class = "";
                break;
            case "point":
                (value < 0 || value > 10 || !value) ? _message.point = "Điểm không được bỏ trống và trong khoảng 0 <= point <= 10" : _message.point = "";
                break;
            default:
            // _message.name = "Tên không được bỏ trống";
            // _message.class = "Lớp không được bỏ trống";
            // _message.point = "Điểm không được bỏ trống và trong khoảng 0 <= point <= 10";
        }

        setMessage(_message);

        if (!_message.name && !_message.class && !_message.point) {
            return true;
        }
    }

    const onChangeDetail = (value, prop) => {
        let _detail = { ...detail };
        _detail[prop] = value;

        validate(value, prop);
        console.log(_detail);
        setDetail(_detail);
    }

    //sửa từ đây ddddddddddddddddddddddddddddddddddddddd

    const clickSubmitHandle = () => {
        let valid = validate()

        if (valid) {
            submitDetail(type, detail)
        }
    }

    return (
        <div>
            <div className="block-input">
                <span className="fix-span">Name: </span>
                <InputText className="fix-input"
                    defaultValue={value.name}
                    onChange={(e) => onChangeDetail(e.target.value, "name")}
                ></InputText>
            </div>

            <div className="block-input">
                <span className="fix-span"></span>
                <small className="danger-color">{message.name}</small>
            </div>

            <div className="block-input">
                <span className="fix-span">Class: </span>
                <InputText className="fix-input"
                    defaultValue={value.class}
                    onChange={(e) => onChangeDetail(e.target.value, "class")}
                ></InputText>
            </div>
            <div className="block-input">
                <span className="fix-span"></span>
                <small className="danger-color">{message.class}</small>
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
            <div className="block-input">
                <span className="fix-span"></span>
                <small className="danger-color">{message.point}</small>
            </div>

            <Button className="fix-button" onClick={() => clickSubmitHandle()}>Submit</Button>
        </div>
    )
}