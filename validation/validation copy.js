function submitAnsFormHandler(element) {
    let formContainerId = $(element).parents("form[class*='formContainer']").attr("id");
    let dataEndpoint = $(element).parents("form[class*='formContainer']").attr("data-endpoint-orbit");
    $("#" + formContainerId + " .forms-message").remove();
    $("#" + formContainerId).children().append('<p class="forms-message"></p>');
    var alertMsg = $("#" + formContainerId + " .forms-message");
    let validation = validateForm(formContainerId);
    if (!validation) {
        return;
    }

    let textareaElem = $("#" + formContainerId).find("textarea");
    let textfieldElem = $("#" + formContainerId).find("input[type='text']");
    var mailBody = '';
    if (textareaElem.length > 0) {
        for (j = 0; j < textareaElem.length; j++) {
            mailBody = createMailBody(textareaElem[0], mailBody);
        }
    }

    if (textfieldElem.length > 0) {
        for (j = 0; j < textfieldElem.length; j++) {
            mailBody = createMailBody(textfieldElem[j], mailBody);
        }
    }

    var subject = "Sub-Zero Condenser Cleaning Instructions";

    var payloadData = {
        mailBody: mailBody,
        subject: subject
    };
}

function validateForm(formContainerId) {
    var formContainer = "#" + formContainerId;
    var textFields = $(formContainer).find('input[type="text"]');
    var textArea = $(formContainer).find('textarea');
    var selectDd = $(formContainer).find('select.renderedBox');
    var validTextfields = textFields.length == 0 ? true : this.validateFormFields(textFields);
    var validtxtArea = textArea.length == 0 ? true : this.validateFormFields(textArea);
    var validSelect = selectDd.length == 0 ? true : this.validateFormFields(selectDd);
    if (validTextfields && validtxtArea && validSelect) {
        return true;
    }
    return false;
}

function validateFormFields(items) {
    items = Array.from(items);
    var setFlag = true;
    items.forEach(element => {
        if (!validationLogic(element)) {
            setFlag = false;
        }
    });
    return setFlag;
}

function validationLogic(element) {
    var requiredValue = false;
    var setFlag = true;
    var requiredAttr = $(element).attr("required");
    if (requiredAttr) {
        requiredValue = $(element).val();
    }
    var fieldValue = $(element).val();
    var regexValue = $(element).attr("pattern");
    if (requiredValue && fieldValue === "") {
        showErrorMessages("invalid", element);
        setFlag = false;
    } else {
        if (regexValue != "" && regexValue != undefined) {
            var regexFormat = new RegExp(regexValue);
            if (regexFormat.test(element.value)) {
                showErrorMessages("success", element);
            } else {
                showErrorMessages("invalid", element);
                setFlag = false;
            }
        }
    }
    return setFlag;
}

function inputChangeHandler(element) {
    validationLogic(element);
}

function createMailBody(formElem, mailBody) {
    let formElemValue = $("#" + formElem.getAttribute('id')).val();
    let formElemLabel = formElem.getAttribute('name');
    mailBody = mailBody + "\n" + formElemLabel + ": " + formElemValue;
    return mailBody;
}

function formAlertMessage(element, msgType, message) {
    if (msgType == "success") {
        $(element).text(message);
        $(element).addClass("alert-success");
        setTimeout(() => {
            $(element).text("");
            $(element).removeClass("alert-success");
        }, 3000);
    } else if (msgType == "error" || msgType == "invalid") {
        $(element).text(message);
        $(element).addClass("alert-danger");
        setTimeout(() => {
            $(element).text("");
            $(element).removeClass("alert-danger");
        }, 3000);
    }
}

function showErrorMessages(msgtype, element) {
    if (msgtype == "success") {
        $(element).parents(".form").find(".errorMsg").css("visibility", "hidden");
    } else {
        $(element).parents(".form").find(".errorMsg").css("visibility", "visible");
    }
}