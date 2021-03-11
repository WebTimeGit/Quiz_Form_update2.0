document.addEventListener("DOMContentLoaded", function () {

    // MODAL START
    let modalItemBtn = document.querySelectorAll('[data-trigger-modal]');
    if (modalItemBtn) {
        let window = document.body;
        let modal = document.querySelectorAll('[data-modal]');
        let modal_content = document.querySelectorAll('.modal_content');
        let closeMode = document.querySelectorAll('[data-close]');
        let targetBtn;

        function openModal() {

            modalItemBtn.forEach(element => {
                element.addEventListener('click', function (e) {
                    e.preventDefault();
                    targetBtn = element.getAttribute('data-label-modal');

                    modal.forEach(element => {

                        let modalId = element.id;

                        if (targetBtn === modalId) {
                            element.classList.add('active');
                            window.style.overflow = 'hidden';
                        }
                    });
                })
            });
        }

        closeMode.forEach(element => {
            element.addEventListener('click', function () {
                modal.forEach(element => {
                    element.classList.remove('active')
                    window.style.overflow = 'initial';
                });
                if (element.getAttribute('data-trigger-modal')) {
                    openModal();
                }
            })
        })

        for (let i = 0; i < modal.length; i++) {
            let elemAttr = modal_content[i].getAttribute('data-important');

            if (elemAttr === 'true') {
                document.addEventListener('mousedown', function (e) {
                    let target = e.target;

                    let currentModal = target === modal_content[i] || modal_content[i].contains(target);

                    if (!currentModal) {
                        modal_content[i].style.transform = 'scale(.99)'
                    }
                })
                document.addEventListener('mouseup', function () {
                    modal_content[i].style.transform = 'scale(1)'
                })
            }
            if (elemAttr === 'false') {
                modal[i].addEventListener('click', function (e) {
                    let target = e.target;
                    let currentModal_content = target === modal_content[i] || modal_content[i].contains(target);
                    let currentModalBtn = target === modalItemBtn[i];

                    if (!currentModal_content && !currentModalBtn) {
                        this.classList.remove('active')
                        window.style.overflow = 'initial';
                    }
                })
            }
        }

        openModal();
    }
    // MODAL THE END

    // RESET PLACEHOLDER INPUT ON CLICK START
    let form_input = document.querySelectorAll('.input_frm');
    if (form_input) {
        for (let i = 0; i < form_input.length; i++) {
            form_input[i].addEventListener('click', function () {
                let thisElement = this;

                let savePlaceholder = this.getAttribute('placeholder');

                this.setAttribute('placeholder', ' ');
                document.addEventListener('mouseup', function () {
                    thisElement.setAttribute('placeholder', savePlaceholder);
                });
            });
        }
    }
    // REST PLACEHOLDER INPUT ON CLICK THE END


    //QUIZ START
    let quiz_form = document.querySelector('.quiz_form');
    if (quiz_form) {
        let PrevBtn = quiz_form.querySelector('.btnPrev');
        let nextBtn = quiz_form.querySelector('.btnNext');
        let quizAll = quiz_form.querySelectorAll('.quiz_block');
        let currentQ = quiz_form.querySelector('.currentQ');
        let progressQ = quiz_form.querySelector('.progress');
        let progress = 0;
        let count = 0;
        let progressPercent = 100 / (quizAll.length - 1);
        initProgress();
        removeBtn();

        quiz_form.querySelector('.allQ').textContent = `${quizAll.length}`;

        nextBtn.addEventListener('click', function () {
            currentQ.textContent++;
            count++
            progress += Number(progressPercent.toFixed(3));
            initQuiz();
            initProgress();
            removeBtn();
            blockBtn();
        })


        PrevBtn.addEventListener('click', function () {
            count--
            currentQ.textContent--;
            progress -= Number(progressPercent.toFixed(3));
            initQuiz();
            initProgress();
            removeBtn();
            blockBtn();
        })

        function initQuiz() {
            quizAll.forEach((element, i) => {
                element.classList.remove('active')
                if (i === count) {
                    element.classList.add('active')
                }
            })
        }

        function initProgress() {
            progressQ.style.width = `${progress}%`;
        }

        function removeBtn() {
            if (count === 0) {
                PrevBtn.style.display = 'none'
            } else if (count !== 0) {
                PrevBtn.style.display = 'block'
            }
            if (count === quizAll.length - 1) {
                nextBtn.style.display = 'none'
            } else if (count !== quizAll.length) {
                nextBtn.style.display = 'block'
            }
        }

        // UPGRADE FORM START

        function blockBtn() {
            let select = quiz_form.querySelector('.select');
            let phone = quiz_form.querySelector('#phone');
            let gender = quiz_form.querySelectorAll("[name = 'gender']");
            let nameInput = quiz_form.querySelector('[name = "name"]');
            let skill = quiz_form.querySelectorAll('[name = "skill"]');
            let contact = quiz_form.querySelectorAll('[name = "contact"]');
            let nextBtnParent = nextBtn.parentElement;
            let formBtn = quiz_form.querySelector('.form_btn');
            let countGender = gender.length;
            let countSkill = skill.length;

            if (count === 0) {
                if ((!nameInput.value) || (nameInput.value === ' ')) {
                    nextBtnParent.classList.add('blockBtn');
                } else {
                    nextBtnParent.classList.remove('blockBtn');
                }
                nameInput.addEventListener('keyup', function () {
                    if ((!this.value) || (this.value === ' ')) {
                        nextBtnParent.classList.add('blockBtn');
                    } else {
                        nextBtnParent.classList.remove('blockBtn');
                    }
                })
            }

            if (count === 1) {
                function addSelectClass() {
                    if (select.options.selectedIndex === 0) {
                        nextBtnParent.classList.add('blockBtn');
                    } else {
                        nextBtnParent.classList.remove('blockBtn');
                    }
                }
                addSelectClass();

                select.addEventListener('click', function () {
                    addSelectClass();
                })
            }

            if (count === 2) {
                gender.forEach(element => {
                    function addGenderClass() {
                        if (element.checked) {
                            nextBtnParent.classList.remove('blockBtn');
                            countGender++
                        } else {
                            nextBtnParent.classList.add('blockBtn');
                            countGender--
                        }
                        if (countGender > 0) {
                            nextBtnParent.classList.remove('blockBtn');
                        }
                    }
                    addGenderClass();

                    element.addEventListener('click', function () {
                        addGenderClass();
                    })
                })
            }

            if (count === 3) {
                skill.forEach((element, i, arr) => {

                    function addSkillClass() {
                        if (element.checked) {
                            countSkill++
                            nextBtnParent.classList.remove('blockBtn');
                        } else {
                            nextBtnParent.classList.add('blockBtn');
                            countSkill--
                        }
                        if (countSkill > 0) {
                            nextBtnParent.classList.remove('blockBtn');
                        }
                    }

                    addSkillClass();

                    element.addEventListener('click', function () {
                        addSkillClass();
                    })
                })
            }

            if (count === quizAll.length - 1) {

                contact.forEach((element) => {
                    if ((!element.value) || (element.value === ' ')) {
                        formBtn.classList.add('blockBtn');
                    } else {
                        formBtn.classList.remove('blockBtn');
                    }

                    element.addEventListener('keyup', function () {
                        if ((!element.value) || (element.value === ' ')) {
                            formBtn.classList.add('blockBtn');
                        } else {
                            formBtn.classList.remove('blockBtn');
                        }
                    })

                })

            }

            // MASK PHONE

            phone.addEventListener('click',function() {
                if (!this.value) {
                    phone.value = "+";
                }

            })
            let old = 0;

            phone.addEventListener('keydown', function () {
                let curLen = phone.value.length;
                if (curLen < old){
                    old--;
                    return;
                }
                if (curLen === 3)
                    phone.value = phone.value + "(";
                if (curLen === 7)
                    phone.value = phone.value + ")-";
                if (curLen === 12)
                    phone.value = phone.value + "-";
                if (curLen === 15)
                    phone.value = phone.value + "-";
                if (curLen > 17)
                    phone.value = phone.value.substring(0, phone.value.length - 1);
                old++;
            })
        }

        blockBtn();

// VALID FORM THE END

    }
// QUIZ THE END


// SELECT START
    let findSelect = document.querySelector('.select');
    if (findSelect) {
        const CustomSelect = function (e) {

            let mainInitId = e.elem ? document.getElementById(e.elem) : e.elem,
                optGroup = mainInitId.querySelectorAll('optgroup'),
                options = mainInitId.options,
                selectedIndex = options[mainInitId.selectedIndex],
                dataIndexCount = 0,
                dataImgCount = 0,
                createSelectLi,
                createSelectImg,
                prefixContainer = 'custom',
                titleClass = 'select_title',
                selectedClass = 'selected',
                selectContainerClass = 'custom_select',
                selectUlClass = 'select_list',
                optGroupClass = 'select_optgroup',
                imgClass = 'select_img',
                imgLazyClass = 'lazy',
                titleClassActive = 'active',
                ulOpenClass = 'open';

            if (localStorage.getItem('selected')) {
                mainInitId.selectedIndex = localStorage.getItem('selected');
            }

            const createSelectContainer = document.createElement('div');
            createSelectContainer.className = selectContainerClass;
            if (mainInitId.id) createSelectContainer.id = `${prefixContainer}-${mainInitId.id}`;

            let createSelectBtn = document.createElement('button');
            createSelectBtn.setAttribute('type', 'button');
            let btnSpan = document.createElement('span');
            createSelectBtn.appendChild(btnSpan);
            createSelectBtn.className = titleClass;
            btnSpan.textContent = options[0].textContent;

            if (selectedIndex.getAttribute('data-srcImg')) {
                let selectedImg = document.createElement('img');
                selectedImg.setAttribute('src', `${selectedIndex.getAttribute('data-srcImg')}`);
                createSelectBtn.appendChild(selectedImg);
            }

            const createSelectUl = document.createElement("ul");
            createSelectUl.className = selectUlClass;

            if (optGroup.length > 0) {
                for (let p = 0; p < optGroup.length; p++) {
                    const createOptgroupItem = document.createElement('div');
                    createOptgroupItem.classList.add(optGroupClass);
                    createOptgroupItem.innerText = optGroup[p].label;
                    createSelectUl.appendChild(createOptgroupItem);
                    createLi(optGroup[p].querySelectorAll('option'));
                }
            } else createLi(options);

            function createLi(e) {
                for (let t = 0; t < e.length; t++) {
                    createSelectLi = document.createElement('li');
                    let liSpan = document.createElement('span');
                    createSelectLi.appendChild(liSpan)
                    liSpan.textContent = e[t].textContent;

                    createSelectLi.setAttribute('data-value', e[t].value);
                    createSelectLi.setAttribute('data-index', `${dataIndexCount++}`);
                    createSelectUl.appendChild(createSelectLi);

                    if (selectedIndex.textContent === e[t].textContent) {
                        createSelectLi.classList.add(selectedClass);
                        btnSpan.textContent = e[t].textContent;
                    }

                    if (options[dataImgCount++].getAttribute('data-srcImg')) {
                        let srcImg = e[t].getAttribute('data-srcImg');
                        createSelectImg = document.createElement('img');
                        createSelectImg.classList.add(imgClass, imgLazyClass);
                        createSelectImg.setAttribute('src', srcImg);
                        createSelectLi.appendChild(createSelectImg);
                    }
                }
            }

            createSelectUl.addEventListener('click', e => {
                const target = e.target;

                if ('DIV' === target.tagName) {
                } else {
                    createSelectBtn.innerHTML = target.closest('li').innerHTML;
                    mainInitId.options.selectedIndex = +target.closest('li').getAttribute('data-index');

                    for (let a = 0; a < options.length; a++) {
                        createSelectUl.querySelectorAll('li')[a].classList.remove(selectedClass);
                        target.closest('li').classList.add(selectedClass);
                    }

                    // localStorage.setItem('selectedList', target.closest('li').getAttribute('data-index'));
                    // localStorage.setItem('btn', target.closest('li').innerHTML);
                    // localStorage.setItem('selected', options[mainInitId.selectedIndex].value);
                }

            });

            createSelectBtn.addEventListener('click', function () {
                createSelectUl.classList.toggle(ulOpenClass);
                createSelectBtn.classList.toggle(titleClassActive);
            });

            document.addEventListener('mouseup', function (e) {
                let isClickInside = createSelectBtn.contains(e.target);
                if (!isClickInside && !e.target.classList.contains(optGroupClass)) {
                    createSelectUl.classList.remove(ulOpenClass);
                    createSelectBtn.classList.remove(titleClassActive);
                }
            })

            // if (localStorage.getItem('selectedList')) {
            //     for (let b = 0; b < options.length; b++) {
            //         createSelectUl.querySelectorAll('li')[b].classList.remove(selectedClass);
            //     }
            //     createSelectUl.querySelectorAll('li')[localStorage.getItem('selectedList')].classList.add(selectedClass);
            // }

            // if (localStorage.getItem('btn')) {
            //     createSelectBtn.innerHTML = localStorage.getItem('btn');
            // }
            createSelectContainer.appendChild(createSelectBtn);
            createSelectContainer.appendChild(createSelectUl);
            mainInitId.parentNode.insertBefore(createSelectContainer, mainInitId);
            mainInitId.style.display = 'none';
        };
        new CustomSelect({
            elem: 'select'
        });
    }
// SELECT THE END

})
;