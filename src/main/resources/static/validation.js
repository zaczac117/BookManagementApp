/** 登録処理用バリデーション */
function validateAddForm() {
    const titleInput = document.getElementById("title");
    const title = titleInput.value.trim();

    // まずクラスをリセット（前のバリデーションを消す）
    titleInput.classList.remove("is-invalid");

    if (title === "") {
        alert("タイトルは必須です。");
        titleInput.classList.add("is-invalid");
        titleInput.focus();
        return false;
    }

    if (title.length > 50) {
        alert("タイトルは50文字以内で入力してください。");
        return false;
    }

    return true;
}

/** 更新処理用バリデーション */
function validateUpdateForm() {
    const titleInputs = document.querySelectorAll('[id^="title-"]');
    for (const input of titleInputs) {
        const title = input.value.trim();
        if (title === "") {
            alert("タイトルは必須です。");
            input.classList.add("is-invalid");
            return false;
        }
        if (title.length > 50) {
            alert("タイトルは50文字以内で入力してください。");
            input.classList.add("is-invalid");
            return false;
        }
        input.classList.remove("is-invalid");
    }
    return true;
}