const sendSms = async (mobile:string, text = "") => {
    const url = `https://console.melipayamak.com/api/send/simple/${process.env.SMSTOKEN}`;

    const headers = {
        'Content-Type': 'application/json',
    };

    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            from: "",
            to: mobile,
            text,
        }),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: headers,
    })

    const response = await res.json();

    console.log(response);

    return response
}