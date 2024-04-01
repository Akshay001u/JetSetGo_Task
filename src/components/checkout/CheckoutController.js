import React, { useState } from 'react'
import CheckoutUI from './CheckoutUI'
import { useRoute } from '@react-navigation/native';

const CheckoutController = () => {
    const route = useRoute();
    const { item } = route.params;
    const [fullName, setFullName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [errorMsg, setErrorMsg] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const submitDetails = () => {
        if (!fullName || !phoneNo) {
            setErrorMsg('Please complete all details')
        } else {
            setErrorMsg('')
            setIsSubmitted(true)
        }
    }

    return (
        <CheckoutUI
            item={item}
            fullName={fullName}
            setFullName={setFullName}
            phoneNo={phoneNo}
            setPhoneNo={setPhoneNo}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            isSubmitted={isSubmitted}
            submitDetails={submitDetails}
        />
    )
}

export default CheckoutController