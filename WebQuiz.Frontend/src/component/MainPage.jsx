import { Button, MenuItem, Select } from "@mui/material"
import { Form, Row } from "@themesberg/react-bootstrap"
import React, { useEffect, useState } from "react"
import { PersonPage } from "./PersonPage";
import { CompanyPage } from "./CompanyPage";
import axios from "axios";
import { API_URL } from "../Constants";
import { RequisitesPage } from "./RequisitesPage";

export const MainPage = () => {

    const [typeAbn, setTypeAbn] = useState(1);
    const [abnData, setAbnData] = useState();

    const [showReq, setShopwReq] = useState(false);

    const [Scans, setScans] = useState();

    useEffect(() => {
        axios.get(API_URL + 'Home/GetAbnData', {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => {
            setAbnData(res.data)
        }).then(() => setScans({
            INN: null,
            OGRNIP: null,
            EGRIP: null,
            Dogovor: null
        })).catch(err => alert(err.message))

    }, [typeAbn])

    function validateForm() {
        var requiredInputs = document.querySelectorAll('input[required]');
        var valid = true;
        for (var i = 0; i < requiredInputs.length; i++) {
            if (!requiredInputs[i].value) {
                valid = false;
            }
        }
        if (!valid) {
            alert('Пожалуйста, заполните все обязательные поля формы');
        }
        return valid;
    }

    const GoNext = () => {
        if (validateForm()) 
            setShopwReq(true)
    }

    const saveAbn = (Requisites) => {
        if (validateForm()) {
            axios.post(API_URL + 'Home/SaveAbn', {
                abnData: abnData,
                requisitesData: Requisites,
            }, {
                headers: 'Access-Control-Allow-Headers","*"',

            }).then(res => {
                var name = res.data;

                var images = []
                images.push(Scans.INN)
                images.push(Scans.OGRNIP)
                images.push(Scans.EGRIP)
                if (Scans.Dogovor != null)
                    images.push(Scans.Dogovor)

                images.forEach(async element => {
                    await axios.post(API_URL + 'Home/uploadFiles/?name=' + name, element,
                        {
                            headers: 'Access-Control-Allow-Headers","*"',
                        })
                });
            }).then(() => alert("Анкета отправлена")).catch(err => alert(err.message))
        }
    }

    const ChooseTypeAbn = () => {
        if (typeAbn == 1) {
            return (<PersonPage abnData={abnData} setAbnData={setAbnData} Scans={Scans} setScans={setScans} />)
        }
        else if (typeAbn == 2) {
            return (<CompanyPage abnData={abnData} setAbnData={setAbnData} Scans={Scans} setScans={setScans} />)
        }
    }

    return (
        <React.Fragment>
            {!showReq ? (
                <div className='PageBody'>
                    <Form.Label>Форма собственности</Form.Label>
                    <br />
                    <br />
                    <p>Вид деятельности*</p>
                    <Select value={typeAbn} onChange={(e) => setTypeAbn(e.target.value)}>
                        <MenuItem value={1}>Индивидуальный предприниматель (ИП)</MenuItem>
                        <MenuItem value={2}>Общество с ограниченной ответственностью (ООО)</MenuItem>
                    </Select>

                    <div class="arrow-1">
                        <div></div>
                    </div>
                    <div>
                        <br />
                        <br />
                        <br />
                        <br />
                        {ChooseTypeAbn()}
                    </div>
                    <br />
                    <Row >
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                            <Button style={{ float: 'right' }} variant="contained" onClick={() => GoNext()}>Далее</Button>
                        </div>
                    </Row>
                </div>) : (<RequisitesPage abnData={abnData} setShopwReq={setShopwReq} saveAbn={saveAbn} />)}
        </React.Fragment>
    )
}