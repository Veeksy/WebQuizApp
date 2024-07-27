import { Col, Form, Row } from "@themesberg/react-bootstrap"
import React from "react"
import { validate } from "../Functions/validate"

export const PersonPage = (props) => {

    const pickupScanINN = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("FormFile", event.target.files[0]);
        formData.append("FileName", event.target.files[0].name);

        props.setScans({...props.Scans, INN: formData});
    }

    const pickupScanOGRNIP = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("FormFile", event.target.files[0]);
        formData.append("FileName", event.target.files[0].name);

        props.setScans({...props.Scans, OGRNIP: formData});
    }

    const pickupScanEGRIP = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("FormFile", event.target.files[0]);
        formData.append("FileName", event.target.files[0].name);

        props.setScans({...props.Scans, EGRIP: formData});
    }

    const pickupScanDogovor = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("FormFile", event.target.files[0]);
        formData.append("FileName", event.target.files[0].name);

        props.setScans({...props.Scans, Dogovor: formData});
    }
    
    return (
        <React.Fragment>
            <Form.Label>Индивидуальный предприниматель (ИП)</Form.Label>
            <br />
            <br />
            <Row>
                <Col md='auto'>
                    <Form.Label as='p' >ИНН*</Form.Label>
                    <Form.Control required placeholder='xxxxxxxxxxx' onKeyPress={(e) => validate(e)} minLength={10} maxLength={10} 
                        onChange={(e) => props.setAbnData({
                            ...props.abnData,
                            inn: e.target.value
                        })} />
                </Col>
                <Col md='auto'>
                    <Form.Label as='p'>Скан ИНН*</Form.Label>
                    <Form.Control required type='file' accept='image/*' onChange={(e) => pickupScanINN(e)} />
                </Col>
                <Col md='auto'>
                    <Form.Label as='p'>ОГРНИП*</Form.Label>
                    <Form.Control required placeholder='xxxxxxxxxxx' onKeyPress={(e) => validate(e)} minLength={15} maxLength={15} 
                        onChange={(e) => props.setAbnData({
                            ...props.abnData,
                            ogrnip: e.target.value
                        })} />
                </Col>
                <Col md='auto'>
                    <Form.Label as='p'>Скан ОГРНИП*</Form.Label>
                    <Form.Control required type='file' accept='image/*' onChange={(e) => pickupScanOGRNIP(e)} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md='auto'>
                    <Form.Label as='p'>Дата регистрации*</Form.Label>
                    <Form.Control required type='date' value={props.abnData?.dateRegister?.split('T')[0]}
                        onChange={(e) => props.setAbnData({
                            ...props.abnData,
                            dateRegister: e.target.value
                        })} />
                </Col>
                <Col md='auto'>
                    <Form.Label as='p'> Скан выписки из ЕГРИП(не старше 3 месяцев)*</Form.Label>
                    <Form.Control required type='file' accept='image/*' onChange={(e) => pickupScanEGRIP(e)}/>
                </Col>
                <Col md='auto'>
                    <Form.Label as='p'>Скан договора аренды помещения(офиса)</Form.Label>
                    <Form.Control type='file' accept='image/*' onChange={(e) => pickupScanDogovor(e)}/>
                </Col>
                <Col md='auto'>
                    <Row>
                    </Row>
                    <br/>
                    <Row>
                        <Col md='auto'>
                            <Form.Label as='p' for="formCheck"> Нет договора</Form.Label>
                        </Col>
                        <Col md='auto'>
                            <Form.Check id="formCheck" 
                                onChange={(e) => props.setAbnData({
                                    ...props.abnData,
                                    withoutDogovor: e.target.checked
                                })}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

        </React.Fragment>

    )
}