import { Col, Form, Row } from "@themesberg/react-bootstrap"
import axios from "axios"
import React, { useEffect } from "react"
import { API_URL } from "../Constants"
import { validate } from "../Functions/validate"

export const CompanyPage = (props) => {



    useEffect(() => {
        if (props.abnData?.inn != null)
        axios.get(API_URL + 'Home/GetCompanyName?INN=' + props.abnData?.inn, {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => {
            if (res.data != null){
                props.setAbnData({...props.abnData,
                    ogrnip: res.data.ogrn,
                    companyName: res.data.name,
                    companyNameSocr: res.data.nameSocr,
                    DateRegister: res.data.dateRegister	
                })
            }
        })

    }, [props.abnData?.inn]);

    const ChangeINN = (e) => {
        props.setAbnData({...props.abnData, inn: e.target.value})
    }

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
            <Form.Label>Общество с ограниченной ответственностью (ООО)</Form.Label>
            <br />
            <br />
            <Row>
            <Col md='auto'>
                    <Form.Label as='p' >Наименование полное*</Form.Label>
                    <Form.Control required placeholder='ООО "Московская промышленная компания"' maxLength={120}
                    value={props.abnData?.companyName}  
                    onChange={(e) => props.setAbnData({
                        ...props.abnData,
                        companyName: e.target.value
                    })}/>
                </Col>
                <Col md='auto'>
                    <Form.Label as='p' >Наименование сокращенное*</Form.Label>
                    <Form.Control required placeholder='ООО "МПК"' value={props.abnData?.companyNameSocr} maxLength={90}
                    onChange={(e) => props.setAbnData({
                        ...props.abnData,
                        companyNameSocr: e.target.value
                    })}/>
                </Col>
                <Col md='auto'>
                    <Form.Label as='p' >Дата регистрации*</Form.Label>
                    <Form.Control type='date' required value={props.abnData?.dateRegister?.split('T')[0]}
                    onChange={(e) => props.setAbnData({
                        ...props.abnData,
                        dateRegister: e.target.value
                    })}/>
                </Col>
            </Row>
            <Row>
                <Col md='auto'>
                    <Form.Label as='p' >ИНН*</Form.Label>
                    <Form.Control required placeholder='xxxxxxxxxxx' onKeyPress={(e) => validate(e)} minLength={10} maxLength={10}  
                    onChange={(e) => ChangeINN(e)}/>
                </Col>
                <Col md='auto'>
                    <Form.Label as='p'>Скан ИНН*</Form.Label>
                    <Form.Control required type='file' placeholder='Выберете или перетащите файл' accept='image/*' onChange={(e) => pickupScanINN(e)}/>
                </Col>
                <Col md='auto'>
                    <Form.Label as='p'>ОГРН*</Form.Label>
                    <Form.Control required placeholder='xxxxxxxxxxx' onKeyPress={(e) => validate(e)} minLength={15} maxLength={15} 
                    onChange={(e) => props.setAbnData({...props.abnData, ogrnip: e.target.value})}/>
                </Col>
                <Col md='auto'>
                    <Form.Label as='p'>Скан ОГРН*</Form.Label>
                    <Form.Control required type='file' accept='image/*' onChange={(e) => pickupScanOGRNIP(e)}/>
                </Col>
            </Row>
            <br />
            <Row>
                <Col md='auto'>
                    <Form.Label as='p'> Скан выписки из ЕГРИП(не старше 3 месяцев)*</Form.Label>
                    <Form.Control required type='file' accept='image/*'  onChange={(e) => pickupScanEGRIP(e)}/>
                </Col>
                <Col md='auto'>
                    <Form.Label as='p'>Скан договора аренды помещения(офиса)*</Form.Label>
                    <Form.Control type='file' accept='image/*'  onChange={(e) => pickupScanDogovor(e)}/>
                </Col>
                <Col md='auto'>
                    <Form.Label as='p' for="formCheck"
                    onChange={(e) => props.setAbnData({...props.abnData, withoutDogovor: e.target.checked})}> Нет договора</Form.Label>
                </Col>
                <Col md='auto'>
                    <Form.Check id="formCheck" />
                </Col>
            </Row>
            <br />
           
        </React.Fragment>
    )
}