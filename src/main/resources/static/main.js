/** 登録機能*/
/** 「登録」ボタンを表示する関数 */
    function showAddBtn() {
        // すべてのフォーム・ボタン・チェックボックスを非表示にリセット
        hideAllFormsAndButtons();
        //　「登録」ボタン取得
        let addBtn = document.getElementById('add-btn');
        addBtn.style.display = "block"
        // 送信用フォーム取得
        let addForm = document.getElementById('add-form');
        addForm.style.display = "block"
        // 書籍カウント表示
        let bookCount = document.getElementById('bookCount');
        bookCount.style.display = "block"
    }

/** 「登録」ボタン押下時に、入力フォームの内容を送信する関数 */
    function submitForm() {
        if (!validateAddForm()) {
            return;
        }
        document.getElementById('add-form').submit();
    }

/** 選択した数のフォームを生成する関数（最大10件） */
function generateForms() {
    const count = parseInt(document.getElementById("bookCount").value);
    const container = document.getElementById("book-forms");
    container.innerHTML = ""; // 既存フォームをクリア

    for (let i = 0; i < count; i++) {
        container.innerHTML += `
            <div class="row mb-2">
                <div class="col">
                    <input type="text" class="form-control" name="books[${i}].title" placeholder="タイトル" required>
                </div>
                <div class="col">
                    <input type="text" class="form-control" name="books[${i}].author" placeholder="著者">
                </div>
                <div class="col">
                    <input type="text" class="form-control" name="books[${i}].genre" placeholder="ジャンル">
                </div>
            </div>
        `;
    }
}

/** 更新機能*/
/** 「更新」ボタンを表示する関数 */
    function showUpdateBtn() {
        // すべてのフォーム・ボタン・チェックボックスを非表示にリセット
        hideAllFormsAndButtons();
        // チェックボックス取得
        let checkboxes = document.querySelectorAll('input[type="checkbox"][name="selectedBooks"]');
        // テーブルヘッダー「アクション」取得
        let actionHeader = document.getElementById('action-header');
        // 「更新」ボタン取得
        let updateBtn = document.getElementById('update-btn');

        // 各チェックボックスの表示/非表示を切り替える
        checkboxes.forEach(checkbox => {
            // 「編集」ボタン押下：チェックボックス、「アクション」、「登録」ボタン、送信用フォーム、「更新」ボタン、「削除」ボタン 表示
            if (checkbox.style.display === "none") {
                checkbox.style.display = "block";
                actionHeader.style.display　= "block"
                updateBtn.style.display = "block"
            } else {
            // 「編集」ボタン押下：チェックボックス、「アクション」、「登録」ボタン、送信用フォーム、「更新」ボタン、「削除」ボタン 非表示
                checkbox.style.display = "none";
                actionHeader.style.display = "none";
                updateBtn.style.display = "none";
            }
        });
    }
/** 「更新」ボタン押下時に、入力フォームの内容を送信する関数 */
        function showUpdateForm() {
        let checkboxes = document.querySelectorAll('input[type="checkbox"][name="selectedBooks"]:checked');
        let updateFields = document.getElementById("update-fields");
        let updateForm = document.getElementById("update-form");
        let submitBtn = document.getElementById("submit-btn");

        // 要素が見つからない場合の対策
        if (!updateFields || !updateForm || !submitBtn) {
            console.error("更新フォームの要素が見つかりません。HTMLにid='update-fields'が正しく設定されているか確認してください。");
            return;
        }

        // チェックボックス未選択
        if (checkboxes.length === 0) {
            alert("更新する本を選択してください");
            return;
        }

        // フォームをクリア
        updateFields.innerHTML = "";

        checkboxes.forEach(checkbox => {
            let bookId = checkbox.value;

            // フォームを追加
            updateFields.innerHTML += `
                <div class="row">
                    <div class="col">
                        <input type="hidden" class="form-control" name="books[${bookId}].id" value="${bookId}">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" id="title-${bookId}" name="books[${bookId}].title" placeholder="タイトル" required>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" name="books[${bookId}].author" placeholder="著者">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" name="books[${bookId}].genre" placeholder="ジャンル">
                    </div>
                </div>
            `;
        });

        // フォームと送信ボタンを表示
        if (checkboxes.length > 0) {
            updateForm.style.display = "block";
            submitBtn.style.display = "block";
        } else {
            updateForm.style.display = "none";
            submitBtn.style.display = "none";
        }
    }

/** 「更新」ボタン押下時に、入力フォームの内容を送信する関数 */
    function updateForm() {
        if (!validateUpdateForm()) {
            return;
        }
        document.getElementById('update-form').submit();
    }

/** 削除機能 */
/** 「削除」ボタン表示 */
    function showDeleteBtn() {
        // すべてのフォーム・ボタン・チェックボックスを非表示にリセット
        hideAllFormsAndButtons();
        // チェックボックス取得
        let checkboxes = document.querySelectorAll('input[type="checkbox"][name="selectedBooks"]');
        // テーブルヘッダー「アクション」取得
        let actionHeader = document.getElementById('action-header');
        // 「削除」ボタン取得
        let deleteBtn = document.getElementById('delete-btn');

        // 各チェックボックスの表示/非表示を切り替える
        checkboxes.forEach(checkbox => {
            // 「編集」ボタン押下：チェックボックス、「アクション」、「登録」ボタン、送信用フォーム、「更新」ボタン、「削除」ボタン 表示
            if (checkbox.style.display === "none") {
                checkbox.style.display = "block";
                actionHeader.style.display　= "block"
                deleteBtn.style.display = "block"
            } else {
            // 「編集」ボタン押下：チェックボックス、「アクション」、「登録」ボタン、送信用フォーム、「更新」ボタン、「削除」ボタン 非表示
                checkbox.style.display = "none";
                actionHeader.style.display = "none";
                deleteBtn.style.display = "none";
            }
        });
    }

/** 「削除」ボタン押下時に、選択されたIDの書籍を削除する関数 */
    function deleteSelectedBooks() {
        // 選択されたチェックボックス取得
        let selectedIds = [];
        let checkboxes = document.querySelectorAll('input[type="checkbox"][name="selectedBooks"]:checked');

        checkboxes.forEach(checkbox => {
            selectedIds.push(checkbox.value);
        });

        // チェックボックス未選択
        if (selectedIds.length === 0) {
            alert("削除する本を選択してください");
            return;
        }

        // 確認ダイアログ表示
        let isConfirmed = confirm("選択した本を削除しますか？");
        if (!isConfirmed) {
            return;
        }

        // 選択されたIDをサーバーに送信（Fetch APIを使用）
        fetch("/deleteBooks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ids: selectedIds })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("削除に失敗しました");
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            location.reload();
        })
        .catch(error => {
            console.error("エラー:", error);
            alert("削除に失敗しました");
        });
    }

/** すべてのフォーム・ボタン・チェックボックスを非表示にする共通関数 */
function hideAllFormsAndButtons() {
    // フォーム
    document.getElementById('add-form').style.display = 'none';
    document.getElementById('update-form').style.display = 'none';

    // ボタン
    document.getElementById('add-btn').style.display = 'none';
    document.getElementById('update-btn').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('delete-btn').style.display = 'none';

    // チェックボックス
    document.querySelectorAll('input[type="checkbox"][name="selectedBooks"]').forEach(cb => {
        cb.style.display = 'none';
    });

    // プルダウン
    document.getElementById('bookCount').style.display = 'none';

    // アクション列
    document.getElementById('action-header').style.display = 'none';
}

