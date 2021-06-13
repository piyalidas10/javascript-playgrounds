function validateFormHandler(element) {
    console.log(element);
    let form = element.closest("form");
    let isValid = isValidForm(form);
    if (isValid) {
        return;
    }
}

function isValidForm(form) {
    let textFields = form.querySelectorAll('input[type="text"]');
    let passwordFields = form.querySelectorAll('input[type="password"]');
    let emailFields = form.querySelectorAll('input[type="email"]');
    let textAreaFields = form.querySelectorAll('textarea');
    let radioFields = form.querySelectorAll('input[type="radio"]');
    let selectFields = form.querySelectorAll('select');
    console.log(textFields);
    console.log(emailFields);
    console.log(textAreaFields);
    console.log(selectFields);
    console.log(radioFields);
    let validTextfields = textFields.length == 0 ? true : validateFields(textFields, 'text');
    let validPasswordfields = passwordFields.length == 0 ? true : validateFields(passwordFields, 'password');
    let validEmail = emailFields.length == 0 ? true : validateFields(emailFields, 'email');
    let validtxtArea = textAreaFields.length == 0 ? true : validateFields(textAreaFields, 'textarea');
    let validRadio = selectFields.length == 0 ? true : validateFields(radioFields, 'radio');
    let validSelect = selectFields.length == 0 ? true : validateFields(selectFields, 'select');
    if (validTextfields && validtxtArea && validSelect && validEmail && validPasswordfields && validRadio) {
        return true;
    }
    return false;
}

function validateFields(fields, fieldType) {
    fields = Array.from(fields);
    let setFlag = true;
    if (fieldType === 'radio') {
        if (!validationRadioScope(fields)) {
            setFlag = false;
        }
    } else {
        fields.forEach(element => {
            if (!validationCommonScope(element, 'formSubmit')) {
                setFlag = false;
            }
        });
    }
    return setFlag;
}

function validationRadioScope(element) {
    let setFlag = false;
    let allNames = [];
    for (let i=0; i<element.length; i++) {
        console.log(element[i].getAttribute("name"));
        if (element[i].hasAttribute("id") && element[i].hasAttribute("name")) {
            let obj = {id: element[i].getAttribute("id"), name: element[i].getAttribute("name"), required: element[i].hasAttribute("validate")};
            allNames.push(obj);
        }
    }
    console.log('allNames => ', allNames);
    let groupedRadio = groupBy(allNames, 'name');
    let groupedRadioArr = Object.values(groupedRadio);
    console.log('groupedRadioArr => ', groupedRadioArr);
    groupedRadioArr.forEach(radioGroup => {
        let hasRequired = radioGroup.filter(radio => radio.required === true);
        console.log('hasRequired => ', hasRequired);
        if (hasRequired.length > 0) {
            let radios = document.getElementsByName(radioGroup[0].name);
            console.log('radios => ', radios);
            setFlag = checkRadioSelection(radios);
        }
    });
    return setFlag;
}

function checkRadioSelection(radios) {
    let setFlag = false;
    radios.forEach(radio => {
        if (radio.checked) {
            setFlag = true;
        }
    });
    if (!setFlag) {
        displayError("invalid", radios[0]);
    } else {
        displayError("valid", radios[0]);
    }
    return setFlag;
}

function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        let key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
}

function validationCommonScope(element, eventType) {
    let setFlag = true;
    let regexValue;
    let requiredAttr = element.hasAttribute("validate");
    let fieldValue = element.value;
    console.log(element, requiredAttr);
    let regexAttr = element.hasAttribute("pattern");
    if (regexAttr) {
        regexValue = element.getAttribute("pattern");
    }
    console.log(regexAttr, regexValue);
    if (requiredAttr && (fieldValue === "" | fieldValue === "-1")) {
        displayError("invalid", element);
        setFlag = false;
    } else {
        matchPattern(element, regexValue, setFlag, eventType);        
    }
    return setFlag;
}

function matchPattern(element, regexValue, setFlag, eventType) {
    if (eventType === 'inputChange') {
        if (regexValue != "" && regexValue != undefined) {
            var regexFormat = new RegExp(regexValue);
            console.log(regexFormat.test(element.value));
            if (regexFormat.test(element.value)) {
                displayError("valid", element);
            } else {
                displayError("invalid", element);
                setFlag = false;
            }
        } else {
            displayError("valid", element);
        }
    }
    return setFlag;
}

function inputHandler(element) {
    console.log(element);
    let inputType = element.getAttribute("type");
    if (inputType === 'radio') {
        let radios = document.getElementsByName(element.name);
        console.log('radios => ', radios);
        checkRadioSelection(radios);
    } else {
        validationCommonScope(element, 'inputChange');
    }
}

function displayError(type, element) {
    console.log(element);
    let parentElem = element.closest('.form-group');
    let isErrorExist = parentElem.querySelector('.invalid-feedback');
    if (type == "valid") {
        if (isErrorExist) {
            parentElem.querySelector('.invalid-feedback').remove();
        }
    } else {
        if (isErrorExist) {
            isErrorExist.innerText = "error";
        } else {
            let errorDiv = document.createElement("div");
            errorDiv.classList.add('invalid-feedback');
            errorDiv.innerText = "error";
            parentElem.appendChild(errorDiv);
        }        
    }
}