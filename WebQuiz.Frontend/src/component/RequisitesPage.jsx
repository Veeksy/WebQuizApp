import { Col, Form, Row } from "@themesberg/react-bootstrap"
import axios from "axios";
import React, { useEffect, useState } from "react"
import { API_URL } from "../Constants";
import { Button } from "@mui/material";
import { validate } from "../Functions/validate";

export const RequisitesPage = (props) => {

    const [Requisites, setRequisites] = useState([]);
    const [Requisite, setRequisite] = useState();

    const [isEffect, setIsEffect] = useState(false)
    const toogleIsEffect = () => setIsEffect(!isEffect)

    useEffect(() => {
        axios.get(API_URL + 'Home/GetRequisitesData',
            {
                headers: 'Access-Control-Allow-Headers","*"'
            }
        ).then(res => setRequisite(res.data))
    }, [isEffect])

    const AddNewReq = () => {
        var req = [...Requisites]
        req.push({
            bik: '',
            bankName: '',
            checkingAccount: '',
            correspondentAccount: ''
        })
        setRequisites(req)
        toogleIsEffect();
    }

    const RemoveRow = (row) => {
        var rq = [...Requisites]
        rq.splice(row, 1)
        setRequisites(rq);
    }

    const changeBik = (e, k) => {
        var newObject = Requisites[k];
        newObject.bik = e.target.value;

        var arr = [...Requisites]
        arr[k] = newObject;
        setRequisites(arr); 
    }

    const changeBank = (e, k) => {
        var newObject = Requisites[k];
        newObject.bankName = e.target.value;

        var arr = [...Requisites]
        arr[k] = newObject;
        setRequisites(arr); 
    }

    const changecheckingAccount = (e, k) => {
        var newObject = Requisites[k];
        newObject.checkingAccount = e.target.value;

        var arr = [...Requisites]
        arr[k] = newObject;
        setRequisites(arr); 
    }

    const changecorrespondentAccount = (e, k) => {
        var newObject = Requisites[k];
        newObject.correspondentAccount = e.target.value;

        var arr = [...Requisites]
        arr[k] = newObject;
        setRequisites(arr); 
    }

    const GetDataFormBik = () => {
        axios.get(API_URL + 'Home/GetBankName?bik=' + Requisite?.bik, {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => {
            if (res.data != null || res.data != undefined)
                setRequisite({
                    ...Requisite,
                    bankName: res.data?.bankName,
                    correspondentAccount: res.data?.correspondentAccount
                })
        })
    }

    const GetDataFormBikInList = (k) => {
        var newObject = Requisites[k];
        
        axios.get(API_URL + 'Home/GetBankName?bik=' + newObject?.bik, {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => {
            if (res.data != null || res.data != undefined){
                newObject.bankName = res.data?.bankName;
                newObject.correspondentAccount = res.data?.correspondentAccount;
            }
        }).then(()=>{
            var arr = [...Requisites]
            arr[k] = newObject;
            setRequisites(arr); 
        })
        
        
    }

    const Send = () => {
        let res = [...Requisites]
        res.push(Requisite)
        props.saveAbn(res)
    }

    return (
        <div className='PageBody'>
            <Row>
                <Col>
                    <Button variant="text" onClick={() => props.setShopwReq(false)}>Вернуться</Button>
                </Col>
            </Row>

            <br />
            <br />
            <Form.Label>Банковские реквизиты</Form.Label>
            <br />
            <br />
            <Row>
                <Col md='auto'>
                    <Form.Label as='p' >БИК*</Form.Label>
                    <Form.Control required placeholder='xxxxxxxxxxx' onKeyPress={(e) => validate(e)} minLength={10} maxLength={10} value={Requisite?.bik}
                        onChange={(e) => setRequisite({ ...Requisite, bik: e.target.value })} />
                </Col>
                <Col md='auto'>
                    <Form.Label as='p'>Название филиала банка*</Form.Label>
                    <Form.Control required placeholder='ООО "Московская промышленная компания"' value={Requisite?.bankName} maxLength={90}
                        onChange={(e) => setRequisite({ ...Requisite, bankName: e.target.value })} />
                </Col>
                <Col md='auto'>
                    <Form.Label as='p'> </Form.Label>
                    <Button variant="contained" onClick={() => GetDataFormBik()}>Заполнить</Button>
                </Col>
            </Row>
            <Row>
                <Col md='auto'>
                    <Form.Label as='p'>Рассчетный счет*</Form.Label>
                    <Form.Control required placeholder='xxxxxxxxxxx' onKeyPress={(e) => validate(e)} minLength={15} maxLength={15} value={Requisite?.checkingAccount}
                        onChange={(e) => setRequisite({
                            ...Requisite,
                            checkingAccount: e.target.value
                        })} />
                </Col>
                <Col md='auto'>
                    <Form.Label as='p'>Корреспондентский счет*</Form.Label>
                    <Form.Control required placeholder='xxxxxxxxxxx' onKeyPress={(e) => validate(e)} maxLength={20} minLength={20} value={Requisite?.correspondentAccount}
                        onChange={(e) => setRequisite({
                            ...Requisite,
                            correspondentAccount: e.target.value
                        })} />
                </Col>
            </Row>
            <br />
            {Requisites?.map((item, k) =>
                <Row>
                    <Row>
                        <Col md='auto'>
                            <Form.Label as='p' >БИК*</Form.Label>
                            <Form.Control id={`bik${k}`} required placeholder='xxxxxxxxxxx' onKeyPress={(e) => validate(e)}
                                minLength={10} maxLength={10} value={item?.bik}
                                onChange={(e) => changeBik(e, k)} />
                        </Col>
                        <Col md='auto'>
                            <Form.Label as='p'>Название филиала банка*</Form.Label>
                            <Form.Control id={`bankName${k}`} required placeholder='ООО "Московская промышленная компания"' maxLength={90} value={item?.bankName}
                                onChange={(e) => changeBank(e, k)} />
                        </Col>
                        <Col md='auto'>
                            <Form.Label as='p'> </Form.Label>
                            <Button variant="text" onClick={() => GetDataFormBikInList(k)}>Заполнить</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='auto'>
                            <Form.Label as='p'>Рассчетный счет*</Form.Label>
                            <Form.Control required id={`checkingAccount${k}`} placeholder='xxxxxxxxxxx' minLength={15}
                                onKeyPress={(e) => validate(e)} maxLength={15}
                                value={item?.checkingAccount}
                                onChange={(e) => changecheckingAccount(e, k)} />
                        </Col>
                        <Col md='auto'>
                            <Form.Label as='p'>Корреспондентский счет*</Form.Label>
                            <Form.Control required id={`correspondentAccount${k}`} placeholder='xxxxxxxxxxx' maxLength={20}
                                onKeyPress={(e) => validate(e)} minLength={20}
                                value={item?.correspondentAccount}
                                onChange={(e) => changecorrespondentAccount(e, k)} />
                        </Col>
                        <Col md='auto'>
                            <Form.Label as='p'> </Form.Label>
                            <Button variant="text" onClick={() => RemoveRow(k)}>Удалить</Button>
                        </Col>
                    </Row>
                </Row>
            )}
            <br />

            <Row>
                <Col>
                    <Button variant="text" onClick={() => AddNewReq()}>+ Добавить ещё один банк</Button>
                </Col>
                <Col>
                    <Button variant="contained" onClick={() => Send()}>Отправить</Button>
                </Col>
            </Row>
        </div>
    )
}