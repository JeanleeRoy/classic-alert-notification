/**
 * A classic alert notification.
 *
 * It gives a general control of time, position and type of alert message to be displayed.
 *
 * @link   https://github.com/JeanleeRoy/classic-alert-notification.
 * @file   This file defines the `alertShow` method and all its help functions.
 * @author Jeanlee Barreto.
 */

const types = ['primary', 'info', 'success', 'warning', 'danger'];
const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left']
const alerError = {'type': 0, 'position': 1}
let zindex = 1000;
min_seconds = 800;

const style = document.createElement('style');
style.innerHTML = `
    body {
        overflow-x: hidden;
    }
    .alert--container {
        font-family: Georgia, Times, 'Times New Roman', serif;
        position: absolute;
        /*left: -80vw;*/
        /*right: -80vw;*/
        /*bottom: 2rem;*/
        /*top: 2rem;*/
        display: flex;
        align-items: center;
        padding: .5rem 1rem;
        width: fit-content;
        border-radius: 7px;
        border: 1px solid black;
        transition: all .6s ease;
    }
    .alert--top-right {
        right: -80vw;
        top: 2rem;
    }
    .alert--top-left {
        left: -80vw;
        top: 2rem;
    }
    .alert--bottom-right {
        right: -80vw;
        bottom: 2rem;
    }
    .alert--bottom-left {
        left: -80vw;
        bottom: 2rem;
    }
    .alert--primary {
        color: #084298;
        background-color: #cfe2ff;
        border-color: #b6d4fe;
    }
    .alert--success {
        color: #0f5132;
        background-color: #d1e7dd;
        border-color: #badbcc;
    }
    .alert--warning {
        color: #664d03;
        background-color: #fff3cd;
        border-color: #ffecb5;
    }
    .alert--info {
        color: #055160;
        background-color: #cff4fc;
        border-color: #b6effb;
    }
    .alert--danger {
        color: #842029;
        background-color: #ffa4a4;
        border-color: #ff7784;
    }`;

document.head.appendChild(style);

const SVG = document.createElement('div');
SVG.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="alert-success" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </symbol>
    <symbol id="alert-info" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
    </symbol>
    <symbol id="alert-danger" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </symbol>
    </svg>
`;
document.body.appendChild(SVG);

const alertContent = (msg, alertType) => {
    icon_type = alertType;
    if (alertType === 'primary') icon_type = 'info';
    else if (alertType === 'warning') icon_type = 'danger';
    return `
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <use xlink:href="#alert-${icon_type}"/></svg>
        <p style="padding-left:10px; padding-bottom:0;">${msg}</p>
    `
}

const randomAlerts = () => {
    color = Math.floor((Math.random() * 5));
    posi = Math.floor((Math.random() * 4));
    return [types[color], positions[posi]];
}

const createAlertElement = (msg, alertType, alertPos) => {
    let div = document.createElement("div");
    div.classList.add("alert--container");
    div.classList.add("alert--" + alertPos)
    div.classList.add("alert--" + alertType)
    div.id = `alert_${zindex}`;
    div.innerHTML = alertContent(msg, alertType);
    document.body.appendChild(div);
    return div.id;
}

const showAlertAnimation = (id, alertPos, sec) => {
    let alertNotify = document.getElementById(id);
    hoizPos = alertPos.split('-')[1]; // 'right', 'left'
    zindex++;
    alertNotify.style.zIndex = zindex;
    if (sec < min_seconds) sec = min_seconds;

    setTimeout(() => {
        alertNotify.style[hoizPos] = '2rem';
        setTimeout(() => {
            alertNotify.style[hoizPos] = '-80rem';
            setTimeout(() => {
                alertNotify.remove();
            }, 400);
        }, sec);
    }, 200);

};

const errMessage = (errType, errVal) => {
    let opt = errType ? 'position' : 'type';
    return `\nThe alert ${opt} "${errVal}" doesn't exist.
    Remember that alert ${opt}s are casesensitive.
    Make sure to use one of the following options`;
}


/**
 * A classic alert notification. It gives a general control of time, position and type of message to be displayed.
 * @param {string} alertType Set the type of alert notification. Possible values: `primary`, `info`, `success`, `warning`, `danger`.
 * @param {string} message The message that will be on the alert notification.
 * @param {number} sec Set how long the message will appear on the screen [time in milliseconds].
 * @param {string} alertPos Set the window position where the alert notification will appear. Possible values: `top-right`, `top-left`, `bottom-right`, `bottom-left`.
 */
const showAlert = (alertType = "danger", message = "", sec = 4000, alertPos = 'top-right') => {

    if (!positions.includes(alertPos)) {
        errMsg = errMessage(alerError.position, alertPos);
        console.error("[Alert Notification: Position Error]", errMsg, positions);
        return;
    }
    
    if (types.includes(alertType)) {
        if (message === "") message = alertType;
        alertId = createAlertElement(message, alertType, alertPos);
        showAlertAnimation(alertId, alertPos, sec);
    } else {
        errMsg = errMessage(alerError.type, alertType);
        console.error("[Alert Notification: Type Error]", errMsg, types);
    }
}

const showRandomAlert = (message = "", sec = 4000) => {
    // Activate random alerts types in different positions
    
    const [alertType, alertPos] = randomAlerts();
    showAlert(alertType, message, sec, alertPos);
}
