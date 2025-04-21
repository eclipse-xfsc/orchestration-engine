// @ts-nocheck
'use strict'

const { createApp } = Vue

const app = createApp({
    data() {
        return {

            message: 'Hello Vue!',
            count: 0,
            lastMsgRecvd: '[Nothing]',
            input1: '',
            ui: {},
            selectedRadioButton: '',
            selectedCheckButton: {},
            selectedSwitchButton: [],
            dropDownselection: '',
            selectedOption: null,
            loading: false,
            warningTitle: "Login failed",
            warningDescription: "You need to install a wallet browser extension to login with your credentials.",
            warningButton: "Close",
            selectedFile: {},
            isFileSelected: false,
            fileInfo: null,
            buffer: "",
            selected: '',
            options: [],
            showSummary: false,
            currentDatasetIndex: 0,
            finalizeButtonEnabled: false,
            scrollStatus: {},
            searchQuery: '',
            currentIndex: 0,
            openedSection: null,
            advanceSearchOption: '',

        }
    },
    mounted() {
        uibuilder.onChange('msg', (msg) => {
            this.lastMsgRecvd = msg
        })
        uibuilder.start()

        var vueApp = this

        uibuilder.onChange('msg', function (msg) {
            if (msg.payload.hasOwnProperty('ui')) vueApp.ui = msg.payload.ui;

            app.msgRecvd = msg

            app.msgsReceived = uibuilder.get('msgsReceived')
            var msgRecvd = app.msgRecvd
            var clientId = uibuilder.get('clientId')
            if (msgRecvd.auth.state === 'Warning') {
                vueApp.loading = true
                vueApp.warningTitle = msgRecvd.auth.title
                vueApp.warningDescription = msgRecvd.auth.description
                vueApp.warningButton = msgRecvd.auth.warningButton
            }
        })

    },

    computed: {
        cardContainerClass() {
            return (index) => {
                if (this.ui.table.leftSide && this.ui.table.leftSide.headers) {
                    return index !== this.ui.table.leftSide.headers.length - 1 ? 'card-container' : '';
                }
                return '';
            };
        },

        filteredLeftSideItems() {
            return this.ui.table.leftSide.headers.filter((header) =>
                header.title.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        filteredRightSideItems() {
            return this.ui.dataset_s.table.rightSide.headersRight.filter((headers) =>
                headers.firstItem.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },

        formatLastRcvd() {
            let lastMsgRecvd = this.lastMsgRecvd
            if (typeof lastMsgRecvd === 'string') return 'Last Message Received = ' + lastMsgRecvd
            return 'Last Message Received = ' + this.syntaxHighlight(lastMsgRecvd)
        },
        allTablesScrolledToBottom() {
            if (!this.showSummary || !this.$refs.summaryTableContainer) {
                return false;
            }

            const allSummaryTableContainers = this.$refs.summaryTableContainer;
            let allScrolledToBottom = true;

            for (let i = 0; i < allSummaryTableContainers.length; i++) {
                const container = allSummaryTableContainers[i];
                const isScrollRequired = container.scrollHeight > container.clientHeight;
                const isAtBottom = container.scrollTop + container.offsetHeight >= container.scrollHeight;

                if (isScrollRequired && !isAtBottom) {
                    allScrolledToBottom = false;
                    break;
                }
            }

            return allScrolledToBottom;
        },


        getContentStyle() {
            return function (i) {
                return {
                    marginTop: -i * 88 + "px",
                };
            };
        },
        getFooterStyle() {
            return function (i) {
                return {
                    marginBottom: -i * 88 + "px",
                };
            };
        },

        footerTop() {
            this.$nextTick(() => {
                const mainContainerRef = this._.refs.mainContainer.clientHeight;
                const middleContainerRef = this._.refs.middleContainer[0].clientHeight;
                const sideContainerRef = this._.refs.sideContainer[0].clientHeight;
                const middleHeight = middleContainerRef - mainContainerRef;
                const leftHeight = sideContainerRef - mainContainerRef;
                const sideHeight = mainContainerRef;

                if (screen.height >= 1440) {
                    if (sideContainerRef >= sideHeight) {
                        this._.refs.footerContainer.style.position = 'relative';
                        this._.refs.footerContainer.style.top = `${middleHeight + 268}px`;
                    } else {
                        this._.refs.footerContainer.style.position = 'relative';
                        this._.refs.footerContainer.style.top = "268px";
                    }

                } else {
                    if (sideContainerRef >= sideHeight) {
                        this._.refs.footerContainer.style.position = 'relative';
                        this._.refs.footerContainer.style.top = `${middleHeight + 20}px`;
                    } else {
                        this._.refs.footerContainer.style.position = 'relative';
                        this._.refs.footerContainer.style.top = "20px";
                    }

                }
            });
            return null;

        },

    },
    watch: {
        showSummary(newValue, oldValue) {
            this.$nextTick(() => {
                const summaryTableContainers = this.$refs.summaryTableContainer;

                if (newValue && !oldValue && summaryTableContainers) {
                    summaryTableContainers.forEach((container, index) => {
                        container.addEventListener('scroll', () => this.handleScroll(index));
                    });
                } else if (!newValue && oldValue && summaryTableContainers) {
                    summaryTableContainers.forEach((container) => {
                        container.removeEventListener('scroll', this.handleScroll);
                    });
                }
            });
        },
    },

    methods: {
        filteredHeadersRight(table) {
            if (table.rightSide && table.rightSide.headersRight) {
                return table.rightSide.headersRight.filter((headers) => {
                    const firstItemMatch = headers.firstItem.toLowerCase().includes(this.searchQuery.toLowerCase());
                    const secondItemMatch = headers.secondItem.toLowerCase().includes(this.searchQuery.toLowerCase());
                    const columnValueMatch = headers.columns.some(column =>
                        column.value.toLowerCase().includes(this.searchQuery.toLowerCase())
                    );

                    const rightColumnSectionContentMatch = headers.rightColumnSections.some(section =>
                        Object.values(section.content).some(contentValue =>
                            contentValue.toLowerCase().includes(this.searchQuery.toLowerCase())
                        )
                    );

                    const rightColumnSectionTechnicalEmailMatch = headers.rightColumnSections.some(section =>
                        section.content.technicalEmail &&
                        section.content.technicalEmail.toLowerCase().includes(this.searchQuery.toLowerCase())
                    );

                    return (
                        firstItemMatch ||
                        secondItemMatch ||
                        columnValueMatch ||
                        rightColumnSectionContentMatch ||
                        rightColumnSectionTechnicalEmailMatch
                    );
                });
            }
            return [];
        },
        findOriginalIndex(header) {
            return this.ui.dataset_s.table.rightSide.headersRight.findIndex(
                (item) => item.firstItem === header.firstItem
            );
        },
        toggleCollapsee: function (index) {
            this.ui.table.leftSide.headers[index].collapsee = !this.ui.table.leftSide.headers[index].collapsee;
        },
        toggleCollapseRight: function (headers) {
            headers.collapse = !headers.collapse;
        },

        toggleSectionCollapse(section) {
            section.collapse = !section.collapse;
        },
        handleScroll(index) {
            const container = this.$refs.summaryTableContainer[index];
            const isScrollRequired = container.scrollHeight > container.clientHeight;
            const isAtBottom = container.scrollTop + container.offsetHeight >= container.scrollHeight;

            if (isScrollRequired && isAtBottom) {
                this.$set(this.scrollStatus, index, true);
            } else {
                this.$set(this.scrollStatus, index, false);
            }
        },
        editForm() {
            this.showSummary = false
        },
        finalizeForm() {
            const clientId = uibuilder.get('clientId')
            uibuilder.send({ payload: { 'clientId': clientId, "ui": this.ui } });
            this.showSummary = false
        },

        modalformshow() {
            this.showSummary = true
        },
        selectFile(formelem, event) {
            this.selectedFile = event.target.files[0];
            const fileExtension = this.selectedFile.name.split('.').pop();
            const reader = new FileReader();
            reader.onload = () => {
                this.buffer = reader.result;
                formelem.value = {
                    "buffer": this.buffer,
                    "Modified": this.selectedFile.lastModifiedDate,
                    "name": this.selectedFile.name,
                    "type": this.selectedFile.type,
                    "size": this.selectedFile.size,
                    "fileExtension": fileExtension
                }
            };
            reader.readAsArrayBuffer(this.selectedFile);

        },

        downloadFile(elem) {
            const downBuffer = elem.value.buffer;
            const byteArray = new Uint8Array(downBuffer);
            const blob = new Blob([byteArray], { type: 'application/octet-stream' });
            const downloadUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = downloadUrl;
            downloadLink.download = elem.value.name;
            downloadLink.click();
        },
        ButtonClicked(type, path, btnRef) {
            if (type == 'onClick') {
                var clientId = uibuilder.get('clientId')
                uibuilder.send({
                    'payload': {
                        'clientId': clientId,
                        "event": {
                            "submit": btnRef,
                            "path": path,
                        }
                    }
                })
            }
            else if (type == 'href') {
                window.open(btnRef, "_blank");
            }
            else if (type == 'onClickSend') {
                var clientId = uibuilder.get('clientId')
                uibuilder.send({
                    'payload': {
                        'clientId': clientId,
                        "event": {
                            "submit": btnRef,
                            "path": path,
                        },
                        "ui": this.ui

                    }
                })
            }
        },

        redirectTo(url) {
            window.location.replace(url)
        },

        nextButton(i) {

            var clientId = uibuilder.get('clientId')
            uibuilder.send({
                'payload': {
                    'clientId': clientId,
                    "ui": this.ui
                }
            })


        },
        closePopUp() {
            this.loading = false;
        },

        isSelected(option) {
            return this.selectedOption === option.value
        },
        selectOption(option) {
            if (this.selectedOption === option.value) {
                this.selectedOption = null
            } else {
                this.selectedOption = option.value
            }
        },
        test() {

        },


        doEvent(event) { uibuilder.eventSend(event) },


        doInputChange(event) {
            uibuilder.send({
                'topic': 'input1-changed',
                'payload': event.target.value,
            })
        },


        syntaxHighlight: function (json) {
            json = JSON.stringify(json, undefined, 4)
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                let cls = 'number'
                if ((/^"/).test(match)) {
                    if ((/:$/).test(match)) {
                        cls = 'key'
                    } else {
                        cls = 'string'
                    }
                } else if ((/true|false/).test(match)) {
                    cls = 'boolean'
                } else if ((/null/).test(match)) {
                    cls = 'null'
                }
                return '<span class="' + cls + '">' + match + '</span>'
            })
            return json
        },


    },


})

app.mount('#app')

