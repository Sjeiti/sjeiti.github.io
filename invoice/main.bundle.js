webpackJsonp([1,5],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__signals__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Saveable; });

var Saveable = (function () {
    function Saveable(modelService, abilities) {
        if (abilities === void 0) { abilities = __WEBPACK_IMPORTED_MODULE_0__signals__["e" /* modelAble */].SAVE; }
        this.modelService = modelService;
        this.changedTimeout = 0;
        this.isModelDirty = false;
        __WEBPACK_IMPORTED_MODULE_0__signals__["e" /* modelAble */].dispatch(abilities);
    }
    Saveable.enable = function (state) {
        __WEBPACK_IMPORTED_MODULE_0__signals__["e" /* modelAble */].dispatch(state);
    };
    Saveable.prototype.ngOnInit = function () {
        var _this = this;
        this.boundKeyhandler = this.onKey.bind(this);
        document.addEventListener('keydown', this.boundKeyhandler);
        __WEBPACK_IMPORTED_MODULE_0__signals__["f" /* modelAction */].add(function (action) {
            action === __WEBPACK_IMPORTED_MODULE_0__signals__["f" /* modelAction */].SAVE && _this.onSave() ||
                action === __WEBPACK_IMPORTED_MODULE_0__signals__["f" /* modelAction */].REVERT && _this.onRevert();
        });
    };
    Saveable.prototype.ngOnDestroy = function () {
        document.removeEventListener('keydown', this.boundKeyhandler);
        __WEBPACK_IMPORTED_MODULE_0__signals__["f" /* modelAction */].removeAll();
        __WEBPACK_IMPORTED_MODULE_0__signals__["d" /* modelDirty */].dispatch(false);
        __WEBPACK_IMPORTED_MODULE_0__signals__["e" /* modelAble */].dispatch();
    };
    Saveable.prototype.setModel = function (model) {
        this.modelSaved = model;
        return this.cloneModel();
    };
    Saveable.prototype.onSave = function () {
        if (this.isObjectLiteral(this.model) && this.isObjectLiteral(this.modelSaved)) {
            for (var prop in this.modelSaved) {
                if (!this.model.hasOwnProperty(prop)) {
                    delete this.modelSaved[prop];
                }
            }
        }
        Object.assign(this.modelSaved, this.model);
        this.modelService.save();
        this.cloneModel();
        this.checkModelDirty();
    };
    Saveable.prototype.onRevert = function () {
        this.cloneModel();
        this.checkModelDirty();
        return this.model;
    };
    Saveable.prototype.onNgModelChanged = function () {
        window.clearTimeout(this.changedTimeout);
        this.changedTimeout = window.setTimeout(this.checkModelDirty.bind(this), 200);
    };
    Saveable.prototype.onDelete = function (deleteMethod) {
        return confirm('Are you sure to delete this?') && deleteMethod(this.modelSaved); // todo: msg from config
    };
    Saveable.prototype.onKey = function (e) {
        // this.isModelDirty&&e.key==='s'&&e.ctrlKey&&(this.onSave()||e.preventDefault())
        this.isModelDirty && e.key === 's' && e.ctrlKey && (__WEBPACK_IMPORTED_MODULE_0__signals__["f" /* modelAction */].dispatch(__WEBPACK_IMPORTED_MODULE_0__signals__["f" /* modelAction */].SAVE) || e.preventDefault());
    };
    Saveable.prototype.checkModelDirty = function () {
        this.isModelDirty = !_.isEqual(this.model, this.modelSaved);
        __WEBPACK_IMPORTED_MODULE_0__signals__["d" /* modelDirty */].dispatch(this.isModelDirty);
        // this.modelService.setDirty(this.isModelDirty)
    };
    Saveable.prototype.cloneModel = function () {
        this.model = _.cloneDeep(this.modelSaved);
        return this.model;
    };
    Saveable.prototype.isObjectLiteral = function (o) {
        return o instanceof Object && o.constructor === Object;
    };
    return Saveable;
}());
//# sourceMappingURL=saveable.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(70);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dateTimeToDate; });
/* unused harmony export isPropertyAccessor */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return dontEnumerateAccessors; });
var _this = this;

var datePipe = new __WEBPACK_IMPORTED_MODULE_0__angular_common__["c" /* DatePipe */]('en');
var dateTimeToDate = function (dateTime) {
    if (dateTime === void 0) { dateTime = ''; }
    return datePipe.transform(dateTime || (new Date).toString(), 'yyyy-MM-dd');
};
var isPropertyAccessor = function (obj, prop) {
    var desc = Object.getOwnPropertyDescriptor(obj, prop);
    return desc && desc.hasOwnProperty && (desc.hasOwnProperty('get') || desc.hasOwnProperty('set'));
};
var dontEnumerateAccessors = function (obj) {
    Object.keys(obj)
        .filter(function (prop) { return isPropertyAccessor(_this, prop); })
        .forEach(function (prop) { return Object.defineProperty(obj, prop, { enumerable: false }); });
};
//# sourceMappingURL=mixins.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InterpolationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InterpolationService = (function () {
    function InterpolationService() {
    }
    /**
     * Interpolate a string with values from an object
     * @param {string} template
     * @param {object} values
     * @returns {string}
     */
    InterpolationService.prototype.parse = function (template, values) {
        var parent = 'values', tmpl = this.prefixVariables(template, parent, values), val;
        try {
            val = new Function(parent, 'return `' + tmpl + '`')(values);
        }
        catch (error) {
            console.warn('interpolation error', { error: error, tmpl: tmpl });
        }
        return val || template;
    };
    /**
     * Prefix all interpolation variables with a parent object identifier
     * @param {string} template
     * @param {string} parent
     * @returns {string}
     */
    InterpolationService.prototype.prefixVariables = function (template, parent, values) {
        var regString = '(' + Object.keys(values).map(function (s) { return s + '[\\.\\(]'; }).join('|') + ')', reg = new RegExp(regString, 'g'), tmpl = template.replace(reg, parent + '.$1');
        return tmpl;
    };
    InterpolationService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], InterpolationService);
    return InterpolationService;
}());
//# sourceMappingURL=interpolation.service.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return INVOICE; });
var invoice = {
    type: {
        invoice: 'invoice',
        reminder: 'reminder'
    },
    VAT: {
        null: 0,
        low: 6,
        high: 21
    },
    VAT_DEFAULT: 21,
    dateFormat: 'dd-MM-yyyy'
};
Object.freeze(invoice);
Object.freeze(invoice.type);
Object.freeze(invoice.VAT);
var INVOICE = invoice;
//# sourceMappingURL=invoice.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* tslint:disable:max-line-length */
var now = Date.now();
var week = 1000 * 60 * 60 * 24 * 7;
var dateString = function (millis) { return (new Date(millis)).toString(); };
var data = {
    timestamp: now,
    clients: [
        {
            nr: 1,
            name: 'Krusty Krab',
            address: '831 Bottomfeeder Lane',
            zipcode: '1000 DG',
            postbox: '',
            zippost: '',
            city: 'Bikini Bottom',
            phone: '',
            paymentterm: '21',
            contact: '',
            projects: [
                {
                    clientNr: 1,
                    description: 'Crabby Patty innovations',
                    invoiceNr: '1.1.16.1',
                    hourlyRate: 0,
                    discount: 0,
                    lines: [
                        {
                            description: '',
                            hours: 0,
                            vat: 21,
                            amount: 1234
                        },
                        {
                            description: '',
                            hours: 0,
                            vat: 21,
                            amount: 444
                        }
                    ],
                    invoices: [
                        {
                            date: dateString(now - 7 * week),
                            type: 'invoice'
                        },
                        {
                            date: dateString(now - 4 * week),
                            type: 'reminder'
                        },
                        {
                            date: dateString(now - 2 * week),
                            type: 'reminder'
                        },
                        {
                            date: dateString(now),
                            type: 'reminder',
                            interest: true
                        }
                    ],
                    paid: false,
                    quotationDate: dateString(now - 8 * week),
                    quotationBefore: '',
                    quotationAfter: ''
                }
            ]
        }
    ],
    personal: {
        name: 'SpongeBob SquarePants',
        address: '124 Conch Street',
        zipcode: '',
        city: 'Bikini Bottom',
        phone: '',
        vatNumber: '1234567',
        kvkNumber: '9876543',
        bank: '192837465',
        iban: 'PO55BBBA0938282773',
        bic: 'BIBOBA',
        bankName: 'Bikini Bottom Bank',
        country: 'Pacific ocean',
        reminderPeriod: 7,
        vatAmount: '21',
        interestAmount: 8.05,
        administrationCosts: 25,
        terms: 'http://squarepants.org/terms.pdf',
        email: 'spongebob@squarepants.org',
        website: 'http://squarepants.org',
        blog: '',
        hourrateMin: '65',
        hourrateMax: '90',
        hoursMin: '32',
        hoursMax: '256',
        lang: 'nl,en'
    },
    copy: {
        sender: {
            nl: '**${data.name}**\n${data.address}\n${data.zipcode} ${data.city}\n${data.vatNumber}\nkvk ${data.kvkNumber}',
            en: '**${data.name}**\n${data.address}\n${data.zipcode} ${data.city}\n${data.vatNumber}\nkvk ${data.kvkNumber}'
        },
        receiver: {
            nl: '**${client.name}**\n${client.address}\n${client.zipcode} ${client.city}\n${client.contact}',
            en: '**${client.name}**\n${client.address}\n${client.zipcode} ${client.city}\n${client.contact}'
        },
        footer: {
            nl: 'Gelieve binnen **${client.paymentterm}** dagen over te maken op bankrekeningnummer (IBAN) **${data.iban}** t.n.v. ${data.name} onder vermelding van factuurnummer **${project.invoiceNr}**. Bij het verstrijken van de betalingstermijn worden administratiekosten en wettelijke rente in rekening gebracht.',
            en: 'Please transfer within ${data.reminderPeriod} days to IBAN ${data.iban}, ${data.bic}, bank name: ${data.bankName} quoting the invoice number. Upon expiry of the payment, administration costs and legal interest will be charged.'
        },
        invoice: {
            nl: 'factuur',
            en: 'invoice'
        },
        reminder: {
            nl: 'herinnering',
            en: 'reminder'
        },
        reminder1: {
            nl: 'Uit de administratie blijkt dat factuur **${project.invoiceNr}** van *${project.dateFormatted}* al **${project.daysLate}** dagen geleden betaald had moeten zijn. Vanaf de tweede herinnering zal **€${data.administrationCosts}** administratiekosten  in rekening gebracht worden, alsmede de wettelijke rente. Mocht u de factuur inmiddels hebben betaald dan kunt u deze herinnering als niet verzonden beschouwen.',
            en: 'We\'ve noticed that invoice **${project.invoiceNr}** from *${project.dateFormatted}* should have been paid **${project.daysLate}** days ago. From the second reminder administration costs (**€${data.administrationCosts}**) and legal interest may be added.'
        },
        reminder2: {
            nl: 'Uit de administratie blijkt dat factuur **${project.invoiceNr}** van *${project.dateFormatted}* al **${project.daysLate}** dagen geleden betaald had moeten zijn. Er zijn **€${data.administrationCosts}** administratiekosten in rekening gebracht, alsmede de wettelijke rente. Mocht u de factuur inmiddels hebben betaald dan kunt u deze herinnering als niet verzonden beschouwen.',
            en: 'We\'ve noticed that invoice **${project.invoiceNr}** from *${project.dateFormatted}* should have been paid **${project.daysLate}** days ago. Administration costs (**€${data.administrationCosts}**) and legal interest have been added.'
        },
        exhortation: {
            nl: 'Aanmanging',
            en: 'Exhortation'
        },
        exhortation_: {
            nl: 'Uit de administratie blijkt dat factuur **${project.invoiceNr}** van *${project.dateFormatted}* al **${project.daysLate}** dagen geleden betaald had moeten zijn.\n<strong>De betaling dient uiterlijk binnen **${client.paymentterm}** dagen na dagtekening te zijn bijgeschreven. Wanneer deze termijn verstreken is zal de vordering uit handen worden gegeven.</strong>\nMocht u de factuur inmiddels hebben betaald dan kunt u deze aanmaning als niet verzonden beschouwen.\nDeze aanmaning zal u zowel per e-mail als per aangetekende post toekomen.',
            en: 'We\'ve noticed that invoice **${project.invoiceNr}** from *${project.dateFormatted}* should have been paid **${project.daysLate}** days ago. **Payment must be fullfilled within **${client.paymentterm}** days after this writing.** If this term is exceeded a debt-collection agency will be called in; the client is liable for any associated costs.'
        },
        dateFormat: {
            nl: 'dd-MM-yyyy',
            en: 'MM/dd/yyyy'
        },
        amount: {
            nl: 'bedrag',
            en: 'amount'
        },
        vat: {
            nl: 'BTW',
            en: 'VAT'
        },
        total: {
            nl: 'totaal',
            en: 'total'
        },
        subtotal: {
            nl: 'subtotaal',
            en: 'subtotal'
        },
        payment: {
            nl: 'betaling',
            en: 'payment'
        },
        date: {
            nl: 'datum',
            en: 'date'
        },
        concerns: {
            nl: 'betreft',
            en: 'concerns'
        },
        number: {
            nl: 'nummer',
            en: 'number'
        },
        legalInterest: {
            nl: 'wettelijke rente',
            en: 'legal interest'
        },
        administrationCosts: {
            nl: 'administratie kosten',
            en: 'administration costs'
        },
        pagebreak: {
            nl: '<div class=\'page-break\'></div>',
            en: '<div class=\'page-break\'></div>'
        }
    }
};
var index = 0;
var copy = data.copy;
for (var key in copy) {
    if (copy.hasOwnProperty(key)) {
        copy[key].index = index;
        index++;
    }
}
/* harmony default export */ __webpack_exports__["a"] = data;
//# sourceMappingURL=data.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrencyFormat; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CurrencyFormat = (function () {
    function CurrencyFormat() {
    }
    CurrencyFormat.prototype.transform = function (value, currencySign, decimalLength, chunkDelimiter, decimalDelimiter, chunkLength) {
        if (currencySign === void 0) { currencySign = '€ '; }
        if (decimalLength === void 0) { decimalLength = 2; }
        if (chunkDelimiter === void 0) { chunkDelimiter = '<span class="chunk" char="."></span>'; }
        if (decimalDelimiter === void 0) { decimalDelimiter = "<span class=\"decimal\" char=\",\">.</span>"; }
        if (chunkLength === void 0) { chunkLength = 3; }
        var result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')', num = value.toFixed(Math.max(0, ~~decimalLength));
        return currencySign + (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);
    };
    CurrencyFormat = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Pipe */])({
            name: 'currencyFormat'
        }), 
        __metadata('design:paramtypes', [])
    ], CurrencyFormat);
    return CurrencyFormat;
}());
//# sourceMappingURL=currency-format.pipe.js.map

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_interpolation_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__client__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signals__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dummy_config__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dummy_data__ = __webpack_require__(157);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModelService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ModelService = (function () {
    function ModelService(interpolationService) {
        this.interpolationService = interpolationService;
        // private static instance:ModelService = null
        this.dataName = 'data';
        this.configName = 'config';
        // get initial config
        var config = localStorage.getItem(this.configName);
        this.initConfig((config && JSON.parse(config) || this.saveConfig(__WEBPACK_IMPORTED_MODULE_6__dummy_config__["a" /* default */])));
        // get initial data
        var data = localStorage.getItem(this.dataName);
        this.initData((data && JSON.parse(data) || __WEBPACK_IMPORTED_MODULE_7__dummy_data__["a" /* default */]));
        !data && this.saveData(this.data);
    }
    //////////////////////////////////////////////////
    /**
     * Config loaded either from LocalStorage or XHR is initialised
     * @param {IConfig} config
     * @returns {IConfig}
     */
    ModelService.prototype.initConfig = function (config) {
        this.config = this.parseConfig(config);
        return config;
    };
    /**
     * Config is saved to LocalStorage
     * @param {IConfig} config
     * @returns {IConfig}
     */
    ModelService.prototype.saveConfig = function (config) {
        localStorage.setItem(this.configName, JSON.stringify(this.setTimestamp(this.parseConfig(config))));
        return config;
    };
    ModelService.prototype.getConfig = function () {
        return this.config;
    };
    ModelService.prototype.setConfig = function (config) {
        return this.initConfig(this.saveConfig(config));
    };
    ModelService.prototype.parseConfig = function (config) {
        if (typeof config.langs === 'string') {
            config.langs = config.langs.split(/,/g);
        }
        return config;
    };
    ModelService.prototype.clearConfig = function () {
        localStorage.removeItem(this.configName);
        location.href = location.href;
    };
    //////////////////////////////////////////////////
    ModelService.prototype.getData = function () {
        return this.data;
    };
    ModelService.prototype.setData = function (data) {
        return this.initData(this.saveData(data));
    };
    ModelService.prototype.getCopy = function () {
        return this.data.copy;
    };
    ModelService.prototype.getPersonal = function () {
        return this.data.personal;
    };
    ModelService.prototype.initData = function (data) {
        var _this = this;
        this.data = data;
        this.clients = data.clients = data.clients.map(function (client) { return _this.createClient(client); });
        this.clients.forEach(function (client) {
            // force client.nr to type number
            client.nr = client.nr << 0;
            // create project instances
            client.projects = client.projects.map(_this.createProject.bind(_this));
        });
        // create all projects
        this.updateProjects();
        // convert datetime to date otherwise input[type=date] cannot eat model
        this.projects.forEach(function (project) {
            project.invoices.forEach(function (invoice) {
                invoice.date = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__mixins__["a" /* dateTimeToDate */])(invoice.date);
            });
            project.quotationDate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__mixins__["a" /* dateTimeToDate */])(project.quotationDate);
            project.clientNr = project.clientNr << 0;
            // fix quotation dates (were mostly set to 09-05-2016)
            if (project.quotationBefore === '' && project.quotationAfter === '') {
                project.quotationDate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__mixins__["a" /* dateTimeToDate */])(new Date('1-1-1970 01:00:00').toString());
            }
        });
        // check default copy
        for (var key in __WEBPACK_IMPORTED_MODULE_7__dummy_data__["a" /* default */].copy) {
            if (!this.data.copy.hasOwnProperty(key)) {
                this.data.copy[key] = __WEBPACK_IMPORTED_MODULE_7__dummy_data__["a" /* default */].copy[key];
            }
        }
        //
        return data;
    };
    ModelService.prototype.saveData = function (data) {
        localStorage.setItem(this.dataName, JSON.stringify(this.setTimestamp(_.cloneDeep(data))));
        return data;
    };
    ModelService.prototype.clearData = function () {
        localStorage.removeItem(this.dataName);
        location.href = location.href;
    };
    //////////////////////////////////////////////////
    ModelService.prototype.save = function () {
        __WEBPACK_IMPORTED_MODULE_5__signals__["a" /* modelBeforeSave */].dispatch();
        this.saveData(this.data);
        this.saveConfig(this.config);
        __WEBPACK_IMPORTED_MODULE_5__signals__["b" /* modelSaved */].dispatch();
    };
    //////////////////////////////////////////////////
    ModelService.prototype.getClients = function () {
        return this.clients || [];
    };
    ModelService.prototype.getClientByNr = function (nr) {
        return this.clients && this.clients.filter(function (client) { return client.nr === nr; }).pop();
    };
    ModelService.prototype.createClient = function (client) {
        return new __WEBPACK_IMPORTED_MODULE_3__client__["a" /* Client */](client);
    };
    ModelService.prototype.addClient = function () {
        var nr = this.highestClientNr() + 1, name = 'new' + nr, client = this.createClient({
            name: name,
            nr: nr,
            projects: [],
            paymentterm: '21' // todo: from config
        });
        this.clients.push(client);
        this.save();
        return client;
    };
    ModelService.prototype.removeClient = function (client) {
        var clients = this.clients, numClients = clients.length;
        _.pull(this.clients, client);
        var isDeleted = (clients.length + 1) === numClients;
        isDeleted && this.save();
        return isDeleted;
    };
    //////////////////////////////////////////////////
    ModelService.prototype.getProjects = function () {
        return this.projects;
    };
    ModelService.prototype.getProject = function (projectId) {
        return this.projects && this.projects.filter(function (project) { return project.invoiceNr === projectId; }).pop();
    };
    ModelService.prototype.updateProjects = function () {
        this.projects = this.clients.length === 0 ? [] : this.clients
            .map(function (client) { return client.projects; })
            .reduce(function (prev, curr) { return prev.concat(curr); });
    };
    ModelService.prototype.createProject = function (project) {
        return new __WEBPACK_IMPORTED_MODULE_2__project__["a" /* Project */](project, this);
    };
    ModelService.prototype.addProject = function (clientNr) {
        var client = this.getClientByNr(clientNr), invoiceNr = [client.nr, client.projects.length + 1, 0, 0].join('.'), // todo: fix
        project = this.createProject({
            clientNr: client.nr,
            invoiceNr: invoiceNr,
            quotationDate: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__mixins__["a" /* dateTimeToDate */])()
        });
        client.projects.push(project);
        this.updateProjects();
        this.save();
        return project;
    };
    ModelService.prototype.removeProject = function (project) {
        var client = this.getClientByNr(project.clientNr), projects = client.projects, numProjects = projects.length;
        _.pull(client.projects, project);
        var isDeleted = (projects.length + 1) === numProjects;
        isDeleted && this.updateProjects();
        isDeleted && this.save();
        return isDeleted;
    };
    ModelService.prototype.calculateInvoiceNr = function (project) {
        var client = this.getClientByNr(project.clientNr), projectNumberTemplate = this.config.projectNumberTemplate, model = { project: project, client: client }, invoiceNr = this.interpolationService.parse(projectNumberTemplate, model);
        return invoiceNr;
    };
    ModelService.prototype.cloneProject = function (project) {
        var clientNr = project.clientNr;
        var clonedProject = this.addProject(clientNr);
        Object.assign(clonedProject, {
            description: project.description,
            discount: project.discount,
            hourlyRate: project.hourlyRate,
            lines: project.lines.map(function (line) { return Object.assign({}, line); }),
            quotationAfter: project.quotationAfter,
            quotationBefore: project.quotationBefore,
            quotationDate: project.quotationDate
        });
        return clonedProject;
    };
    //////////////////////////////////////////////////
    ModelService.prototype.highestClientNr = function () {
        var highest = 0;
        this.clients.forEach(function (client) {
            if (client.nr > highest) {
                highest = client.nr;
            }
        });
        return highest;
    };
    ModelService.prototype.setTimestamp = function (o) {
        o.timestamp = Date.now();
        return o;
    };
    ModelService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_interpolation_service__["a" /* InterpolationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__service_interpolation_service__["a" /* InterpolationService */]) === 'function' && _a) || Object])
    ], ModelService);
    return ModelService;
    var _a;
}());
//# sourceMappingURL=model.service.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins__ = __webpack_require__(104);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Client; });

var Client = (function () {
    function Client(model) {
        this.address = '';
        this.city = '';
        this.contact = '';
        this.name = '';
        this.nr = -1;
        this.paymentterm = '';
        this.phone = '';
        this.postbox = '';
        this.projects = [];
        this.zipcode = '';
        this.zippost = '';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__mixins__["b" /* dontEnumerateAccessors */])(this);
        for (var name in model) {
            if (model.hasOwnProperty(name)) {
                this[name] = model[name];
            }
        }
    }
    Client.prototype.clone = function () {
        return new Client(this);
    };
    Object.defineProperty(Client.prototype, "lastInvoiceNr", {
        get: function () {
            return this.projects.filter(function (project) { return project.invoices.length > 0; }).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "lastProjectDate", {
        get: function () {
            var date = new Date(0);
            this.projects.map(function (project) { return project.date; }).forEach(function (projectDate) {
                // if (projectDate.getTime()>date.getTime()) {
                if (projectDate > date) {
                    date = projectDate;
                }
            });
            return date;
        },
        enumerable: true,
        configurable: true
    });
    return Client;
}());
//# sourceMappingURL=client.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins__ = __webpack_require__(104);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Project; });


var Project = (function () {
    function Project(model, modelService) {
        this.modelService = modelService;
        this.clientNr = -1;
        this.description = '';
        this.discount = 0;
        this.hourlyRate = 80;
        this.invoiceNr = '';
        this.invoices = [];
        this.lines = [];
        this.paid = false;
        this.quotationAfter = '';
        this.quotationBefore = '';
        this.quotationDate = '';
        this.startValue = [0];
        Object.defineProperty(this, 'modelService', { enumerable: false });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__mixins__["b" /* dontEnumerateAccessors */])(this);
        for (var name in model) {
            if (model.hasOwnProperty(name)) {
                this[name] = model[name];
            }
        }
        this.datePipe = new __WEBPACK_IMPORTED_MODULE_0__angular_common__["c" /* DatePipe */]('en');
        this.personal = this.modelService.getPersonal();
        this.copy = this.modelService.getCopy();
        this.config = this.modelService.getConfig();
    }
    Project.prototype.clone = function () {
        return new Project(this, this.modelService);
    };
    Object.defineProperty(Project.prototype, "total", {
        get: function () {
            return this.startValue.concat(this.lines).reduce(function (acc, line) { return acc + line.amount; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "totalVat", {
        get: function () {
            return this.startValue.concat(this.lines).reduce(function (acc, line) { return acc + line.amount * 0.01 * line.vat; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "totalDiscount", {
        get: function () {
            return this.total * 0.01 * this.discount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "totalVatDiscount", {
        get: function () {
            return this.totalVat * 0.01 * this.discount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "totalDiscounted", {
        get: function () {
            return this.total - this.totalDiscount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "totalVatDiscounted", {
        get: function () {
            return this.totalVat - this.totalVatDiscount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "totalIncDiscounted", {
        get: function () {
            return this.totalDiscounted + this.totalVatDiscounted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "totalIncDiscountedInterest", {
        get: function () {
            return this.totalIncDiscounted + this.interest;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "interest", {
        get: function () {
            return (this.daysLate / 365) * (0.01 * this.personal.interestAmount) * this.total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "daysLate", {
        get: function () {
            var today = new Date, diffMillis = today.getTime() - this.date.getTime(), day = 1000 * 60 * 60 * 24;
            return diffMillis / day << 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "date", {
        get: function () {
            return this.invoices.length !== 0 ? new Date(this.invoices[0].date) : new Date();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "dateLatest", {
        get: function () {
            var latestDate = new Date(this.quotationDate);
            this.invoices.forEach(function (invoice) {
                var invoiceDate = new Date(invoice.date);
                if (invoiceDate > latestDate) {
                    latestDate = invoiceDate;
                }
            });
            return latestDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "hourlyRateDiscounted", {
        get: function () {
            return this.hourlyRate - 0.01 * this.discount * this.hourlyRate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "totalHours", {
        get: function () {
            return this.startValue.concat(this.lines).reduce(function (acc, line) { return acc + line.hours; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "indexOnClient", {
        get: function () {
            var client = this.modelService.getClientByNr(this.clientNr), projects = client && client.projects.sort(this.sortProjectsByDateDescription) || [];
            return projects.indexOf(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "indexOnYear", {
        get: function () {
            var year = this.year, projectsInYear = this.modelService.getProjects()
                .filter(function (project) { return project.invoices.length > 0 && project.year === year; })
                .sort(this.sortProjectsByDateDescription);
            return projectsInYear.indexOf(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "timestamp", {
        get: function () {
            return this.date.getTime();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "timestampLatest", {
        get: function () {
            return this.dateLatest.getTime();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "year", {
        get: function () {
            return this.date.getFullYear();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "quarter", {
        get: function () {
            return ((this.date.getMonth() + 1) / 4) << 0 + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "dateYear", {
        get: function () {
            return this.year.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "dateFormatted", {
        get: function () {
            var dateFormat = this.copy.dateFormat[this.config.lang];
            return this.datePipe.transform(this.date, dateFormat);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "uri", {
        get: function () {
            return "/client/" + this.clientNr + "/" + this.invoiceNr;
        },
        enumerable: true,
        configurable: true
    });
    Project.prototype.sortProjectsByDateDescription = function (a, b) {
        return a.date.toString() === b.date.toString() ? (a.description > b.description ? 1 : -1) : (a.date > b.date ? 1 : -1);
    };
    return Project;
}());
//# sourceMappingURL=project.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_marked__ = __webpack_require__(620);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_marked___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_marked__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_model_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalisationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LocalisationService = (function () {
    function LocalisationService(modelService) {
        this.modelService = modelService;
        this.copy = {};
        this.extra = {};
        __WEBPACK_IMPORTED_MODULE_1_marked__["setOptions"]({
            renderer: new __WEBPACK_IMPORTED_MODULE_1_marked__["Renderer"](),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });
        this.config = modelService.getConfig();
        var data = modelService.getData();
        this.setCopy(data.copy);
        this.addExtra(data.personal, 'personal');
    }
    LocalisationService.prototype.setCopy = function (copy) {
        this.copy = copy;
    };
    LocalisationService.prototype.addExtra = function (obj, name) {
        this.extra[name] = obj;
    };
    LocalisationService.prototype.__ = function (text) {
        var translation = this.getExtra(text);
        //
        if (this.copy.hasOwnProperty(text)) {
            translation = this.copy[text][this.config.lang] || translation;
        }
        translation = this.interpolate(translation) || translation;
        translation = translation && __WEBPACK_IMPORTED_MODULE_1_marked__('' + translation).replace(/^<p>|<\/p>\s$/g, '') || translation;
        return translation;
    };
    LocalisationService.prototype.getExtra = function (text) {
        if (/^\w+\.\w+$/.test(text)) {
            var split_1 = text.split(/\./g), obj_1 = this.extra;
            split_1.forEach(function (s, i) {
                if (obj_1[s]) {
                    obj_1 = obj_1[s];
                    if (i === split_1.length - 1) {
                        text = obj_1;
                    }
                }
            });
        }
        return text;
    };
    LocalisationService.prototype.interpolate = function (text) {
        var _this = this;
        var match = text.match && text.match(/%\w+(\.\w+)*%/g);
        match && match.forEach(function (line) {
            text = text.replace(line, _this.__(line.replace(/^%|%$/g, '')));
        });
        return text;
    };
    LocalisationService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__model_model_service__["a" /* ModelService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__model_model_service__["a" /* ModelService */]) === 'function' && _a) || Object])
    ], LocalisationService);
    return LocalisationService;
    var _a;
}());
//# sourceMappingURL=localisation.service.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AboutComponent = (function () {
    function AboutComponent() {
    }
    AboutComponent.data = {
        title: 'About',
        heading: '',
        meta: { description: 'Welcome to something' }
    };
    AboutComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-about',
            template: __webpack_require__(634),
            styles: [__webpack_require__(608)]
        }), 
        __metadata('design:paramtypes', [])
    ], AboutComponent);
    return AboutComponent;
}());
//# sourceMappingURL=about.component.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__abstract_saveable__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_model_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signals__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ClientComponent = (function (_super) {
    __extends(ClientComponent, _super);
    function ClientComponent(modelService, route, router) {
        var _this = this;
        _super.call(this, modelService, __WEBPACK_IMPORTED_MODULE_4__signals__["e" /* modelAble */].SAVE | __WEBPACK_IMPORTED_MODULE_4__signals__["e" /* modelAble */].DELETE);
        this.modelService = modelService;
        this.route = route;
        this.router = router;
        __WEBPACK_IMPORTED_MODULE_4__signals__["f" /* modelAction */].add(function (state) {
            state === __WEBPACK_IMPORTED_MODULE_4__signals__["f" /* modelAction */].DELETE && _this.onDelete();
        });
    }
    ClientComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.subscription = this.route.params.subscribe(function (params) {
            _this.clientNr = params['clientNr'] << 0;
        });
        this.client = this.setModel(this.modelService.getClientByNr(this.clientNr));
    };
    ClientComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.subscription.unsubscribe();
    };
    ClientComponent.prototype.onDelete = function () {
        var isDeleted = _super.prototype.onDelete.call(this, this.modelService.removeClient.bind(this.modelService));
        isDeleted && this.router.navigate(['/clients']);
        return isDeleted;
    };
    ClientComponent.prototype.onAddProject = function () {
        var project = this.modelService.addProject(this.clientNr);
        this.router.navigate(['/client/' + this.clientNr + '/' + project.invoiceNr]);
    };
    ClientComponent.prototype.cloneModel = function () {
        this.client = _super.prototype.cloneModel.call(this);
        return this.client;
    };
    ClientComponent.data = {
        title: 'Client',
        heading: 'Client',
        meta: { description: 'Foo is the bar of all qux' }
    };
    ClientComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-client',
            template: __webpack_require__(635),
            styles: [__webpack_require__(609)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__model_model_service__["a" /* ModelService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__model_model_service__["a" /* ModelService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _c) || Object])
    ], ClientComponent);
    return ClientComponent;
    var _a, _b, _c;
}(__WEBPACK_IMPORTED_MODULE_2__abstract_saveable__["a" /* Saveable */]));
//# sourceMappingURL=client.component.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_model_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ClientsComponent = (function () {
    function ClientsComponent(router, modelService) {
        this.router = router;
        this.modelService = modelService;
        this.nameFilter = '';
    }
    ClientsComponent.prototype.ngOnInit = function () {
        this.clients = this.modelService.getClients();
    };
    ClientsComponent.prototype.onAddClient = function () {
        var client = this.modelService.addClient();
        this.router.navigate(['/client/' + client.nr]);
    };
    ClientsComponent.data = {
        title: 'Clients',
        heading: 'Clients',
        meta: { description: 'Foo is the bar of all qux' }
    };
    ClientsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-clients',
            template: __webpack_require__(636),
            styles: [__webpack_require__(610)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__model_model_service__["a" /* ModelService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__model_model_service__["a" /* ModelService */]) === 'function' && _b) || Object])
    ], ClientsComponent);
    return ClientsComponent;
    var _a, _b;
}());
//# sourceMappingURL=clients.component.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_saveable__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_model_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dummy_data__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CopyComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CopyComponent = (function (_super) {
    __extends(CopyComponent, _super);
    function CopyComponent(modelService) {
        _super.call(this, modelService);
        this.modelService = modelService;
        this.copySorted = [];
    }
    CopyComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.copy = this.setModel(this.modelService.getCopy());
        this.buildCopySorted();
        this.initDrag();
    };
    CopyComponent.prototype.initDrag = function () {
        var Observable = __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"];
        var merge = Observable.merge.bind(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
        var fromEvent = Observable.fromEvent.bind(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
        var fromDc = fromEvent.bind(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__, document);
        //
        var mousedown = merge(fromDc('mousedown'), fromDc('touchstart'));
        var mouseup = merge(fromDc('mouseup'), fromDc('touchend'));
        var mousemove = merge(fromDc('mousemove'), fromDc('touchmove'));
        //
        var dragstart = mousedown.flatMap(function () { return mousemove.takeUntil(mouseup).take(1); });
        var dragmove = mousedown.flatMap(function () { return mousemove.takeUntil(mouseup); }).map(function (e) {
            var subj = e.constructor === TouchEvent && e.touches[0] || e;
            return {
                e: e,
                x: subj.clientX,
                y: subj.clientY
            };
        });
        dragstart.subscribe(this.onDragStart.bind(this));
        dragmove.subscribe(this.onDragMove.bind(this));
        mouseup.subscribe(this.onDragEnd.bind(this));
    };
    CopyComponent.prototype.onDragStart = function (e) {
        var _this = this;
        if (e.target.nodeName === 'DT') {
            var target = e.target, parentDL = target.parentNode, section = parentDL.parentNode;
            this.sectionRect = section.getBoundingClientRect();
            this.dragFrom = target;
            var sibling = this.dragFrom.nextElementSibling;
            var siblings = [this.dragFrom];
            while (sibling && sibling.nodeName === 'DD') {
                siblings.push(sibling);
                sibling = sibling.nextElementSibling;
            }
            this.clone = parentDL.cloneNode(false);
            this.clone.classList.add('clone');
            siblings.forEach(function (elm) { return _this.clone.appendChild(elm.cloneNode(true)); });
            var parentNode = this.dragFrom.parentNode.parentNode;
            parentNode.appendChild(this.clone);
            parentNode.style.position = 'relative';
            Object.assign(this.clone.style, {
                position: 'absolute',
                width: '100%',
                left: 0,
                top: 0
            });
        }
    };
    CopyComponent.prototype.onDragMove = function (_a) {
        var e = _a.e, x = _a.x, y = _a.y;
        if (this.dragFrom) {
            this.dragTo = e.target;
            // const isFoo = this.dragTo===this.dragFrom,
            //     isDt = this.dragTo.nodeName==='DT'
            this.clone.style.todp = (y - this.sectionRect.top) + "px";
            e.preventDefault();
        }
    };
    CopyComponent.prototype.onDragEnd = function () {
        if (this.dragFrom && this.dragTo) {
            var dts = this.dragFrom.parentNode.querySelectorAll('dt'), indexFrom = Array.prototype.indexOf.call(dts, this.dragFrom), indexTo = Array.prototype.indexOf.call(dts, this.dragTo);
            if (indexFrom >= 0 && indexTo >= 0 && indexFrom !== indexTo) {
                this.copySorted[indexFrom].value.index = this.copySorted[indexTo].value.index + (indexFrom > indexTo ? -0.1 : 0.1);
                this.copySorted.sort(function (a, b) { return a.value.index > b.value.index ? 1 : -1; });
                this.copySorted.forEach(function (o, i) {
                    o.value.index = i;
                });
            }
        }
        this.dragFrom = null;
        this.dragTo = null;
        this.clone && this.clone.parentNode.removeChild(this.clone);
        this.clone = null;
    };
    CopyComponent.prototype.onAdd = function () {
        var name = prompt('name').replace(/[^_A-Za-z0-9]/g, '');
        if (name !== '') {
            this.copy[name] = { nl: name, en: name, index: this.highestIndex + 1 };
        }
        this.buildCopySorted();
        this.checkModelDirty();
    };
    CopyComponent.prototype.keyDeletable = function (key) {
        return !__WEBPACK_IMPORTED_MODULE_3__dummy_data__["a" /* default */].copy.hasOwnProperty(key);
    };
    CopyComponent.prototype.onRemoveCopy = function (name) {
        delete this.copy[name];
        this.buildCopySorted();
        this.checkModelDirty();
    };
    /*onIndexUp(name:string){
      this.moveIndex(name, -1)
    }
  
    onIndexDown(name:string){
      this.moveIndex(name, 1)
    }*/
    CopyComponent.prototype.cloneModel = function () {
        return this.copy = _super.prototype.cloneModel.call(this);
    };
    Object.defineProperty(CopyComponent.prototype, "lang", {
        get: function () {
            return this.modelService.config.lang;
        },
        enumerable: true,
        configurable: true
    });
    /*private moveIndex(name:string, to:number) {
      let value = this.copy[name],
          index = value.index,
          indexNew = index + to,
          swap = this.copySorted[indexNew].value
      if (indexNew>0&&indexNew<this.copySorted.length) {
        value.index = indexNew
        swap.index = index
        this.buildCopySorted()
        this.checkModelDirty()
      }
    }*/
    CopyComponent.prototype.buildCopySorted = function () {
        var copy = this.copy, copySorted = this.copySorted;
        copySorted.length = 0;
        for (var name in copy) {
            if (copy.hasOwnProperty(name)) {
                var value = this.copy[name], index = value.index;
                copySorted[index] = { name: name, value: value };
            }
        }
    };
    Object.defineProperty(CopyComponent.prototype, "highestIndex", {
        get: function () {
            var index = 0, copy = this.copy;
            for (var name in copy) {
                if (copy.hasOwnProperty(name)) {
                    var value = this.copy[name];
                    if (value.index > index) {
                        index = value.index;
                    }
                }
            }
            return index;
        },
        enumerable: true,
        configurable: true
    });
    CopyComponent.data = {
        title: 'Copy',
        heading: 'Copy',
        meta: { description: 'Foo is the bar of all qux' }
    };
    CopyComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-copy',
            template: __webpack_require__(637),
            styles: [__webpack_require__(611)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__model_model_service__["a" /* ModelService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__model_model_service__["a" /* ModelService */]) === 'function' && _a) || Object])
    ], CopyComponent);
    return CopyComponent;
    var _a;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_saveable__["a" /* Saveable */]));
//# sourceMappingURL=copy.component.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_saveable__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_model_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DataComponent = (function (_super) {
    __extends(DataComponent, _super);
    function DataComponent(modelService) {
        _super.call(this, modelService);
        this.modelService = modelService;
    }
    DataComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.personal = this.setModel(this.modelService.getPersonal());
    };
    DataComponent.prototype.cloneModel = function () {
        return this.personal = _super.prototype.cloneModel.call(this);
    };
    DataComponent.data = {
        title: 'Data',
        heading: 'Data',
        meta: { description: 'Foo is the bar of all qux' }
    };
    DataComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-data',
            template: __webpack_require__(638)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__model_model_service__["a" /* ModelService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__model_model_service__["a" /* ModelService */]) === 'function' && _a) || Object])
    ], DataComponent);
    return DataComponent;
    var _a;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_saveable__["a" /* Saveable */]));
//# sourceMappingURL=data.component.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Error404Component; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Error404Component = (function () {
    function Error404Component() {
    }
    Error404Component.prototype.ngOnInit = function () {
    };
    Error404Component.data = {
        title: '404',
        heading: 'Ehrm.... ',
        meta: { robots: 'noindex, nofollow' }
    };
    Error404Component = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-error404',
            template: __webpack_require__(639),
            styles: [__webpack_require__(612)]
        }), 
        __metadata('design:paramtypes', [])
    ], Error404Component);
    return Error404Component;
}());
//# sourceMappingURL=error404.component.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_model_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_invoice__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins__ = __webpack_require__(104);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomeComponent = (function () {
    function HomeComponent(router, modelService) {
        this.router = router;
        this.modelService = modelService;
        this.projects = [];
        this.dateFormat = __WEBPACK_IMPORTED_MODULE_3__config_invoice__["a" /* INVOICE */].dateFormat;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.projects = this.modelService.getProjects();
        this.latestClient = this.modelService.getClients().slice(0).sort(function (client1, client2) {
            return client1.lastProjectDate > client2.lastProjectDate ? 1 : -1;
        }).slice(0).pop();
        this.latestProject = this.latestClient && this.latestClient.projects.slice(0).pop();
    };
    HomeComponent.prototype.onPaidChange = function () {
        this.modelService.save();
    };
    HomeComponent.prototype.onAddReminder = function (project) {
        var invoices = project.invoices, numInvoices = invoices.length;
        invoices.push({
            date: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__mixins__["a" /* dateTimeToDate */])(),
            type: numInvoices === 0 ? 'invoice' : 'reminder',
            interest: false,
            exhortation: false
        });
        this.modelService.save();
        var clientNr = project.clientNr;
        this.router.navigate(['/client/' + clientNr + '/' + project.invoiceNr + '/reminder/' + (numInvoices + 1)]);
    };
    HomeComponent.prototype.onAddClient = function () {
        var client = this.modelService.addClient();
        this.router.navigate(['/client/' + client.nr]);
    };
    HomeComponent.prototype.onAddProjectForLatestClient = function () {
        var clientNr = this.latestClient.nr;
        var project = this.modelService.addProject(this.latestClient.nr);
        this.router.navigate(['/client/' + clientNr + '/' + project.invoiceNr]);
    };
    HomeComponent.prototype.onCloneLatestProject = function () {
        if (this.latestProject) {
            var clonedProject = this.modelService.cloneProject(this.latestProject);
            this.router.navigate(['/client/' + clonedProject.clientNr + '/' + clonedProject.invoiceNr]);
        }
    };
    HomeComponent.data = {
        title: 'Home',
        heading: '',
        meta: { description: 'Welcome to something' }
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__(640),
            styles: [__webpack_require__(613)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__model_model_service__["a" /* ModelService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__model_model_service__["a" /* ModelService */]) === 'function' && _b) || Object])
    ], HomeComponent);
    return HomeComponent;
    var _a, _b;
}());
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_model_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvoiceComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import {INVOICE} from '../../config/invoice'
var InvoiceComponent = (function () {
    function InvoiceComponent(element, modelService, route) {
        this.element = element;
        this.modelService = modelService;
        this.route = route;
        this.pageReady = false;
    }
    InvoiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.elm = this.element.nativeElement;
        this.subscription = this.route.params.subscribe(function (params) {
            var clientNr = params.clientNr << 0;
            _this.projectId = params.projectNr;
            _this.client = _this.modelService.getClientByNr(clientNr);
            _this.project = _this.modelService.getProject(_this.projectId);
            _this.reminderNr = params.hasOwnProperty('reminderNr') ? params.reminderNr << 0 : 0;
            _this.invoice = _this.project.invoices[_this.reminderNr];
            _this.invoiceName = 'invoice' + _this.project.invoiceNr + '_' + _this.invoice.type;
        });
        this.populateIframe()
            .then(this.renderImage.bind(this));
    };
    /**
     * Call print on the iframe if the page is ready
     */
    InvoiceComponent.prototype.onClickPrint = function () {
        this.pageReady && this.iframe.contentWindow.print();
    };
    /**
     * IE hack to download the image
     * @param {event} e
     * @todo: use FileSaver.js ?
     */
    InvoiceComponent.prototype.onClickDownload = function (e) {
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(this.canvas.msToBlob(), this.invoiceName + ".png");
            e.preventDefault();
        }
    };
    /**
     * Create and download an image from the iframe if the page is ready
     */
    InvoiceComponent.prototype.renderImage = function () {
        var _this = this;
        console.log('renderImage'); // todo: remove log
        html2canvas(this.iframe.contentWindow.document.body, {})
            .then(function (canvas) {
            _this.canvas = canvas;
            _this.dataUrl = _this.canvas.toDataURL();
        });
    };
    /**
     * Populate the iframe with unbound html and css
     */
    InvoiceComponent.prototype.populateIframe = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                _this.iframe = _this.elm.querySelector('iframe');
                var contentWindow = _this.iframe.contentWindow, contentDocument = contentWindow.document, contentBody = contentDocument.body;
                //
                contentDocument.title = _this.invoiceName;
                //
                var html = _this.elm.querySelector('app-print-invoice').innerHTML;
                var styles = Array.from(document.querySelectorAll('style')).map(function (style) { return style.outerHTML; }).join('');
                //
                contentBody.innerHTML = html + styles;
                //
                resolve();
                _this.pageReady = true;
            });
        });
    };
    InvoiceComponent.data = {
        title: 'Invoice',
        heading: 'Invoice',
        meta: { description: 'Foo is the bar of all qux' }
    };
    InvoiceComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-invoice',
            template: __webpack_require__(641),
            styles: [__webpack_require__(614)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__model_model_service__["a" /* ModelService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__model_model_service__["a" /* ModelService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === 'function' && _c) || Object])
    ], InvoiceComponent);
    return InvoiceComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=invoice.component.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_model_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_invoice__ = __webpack_require__(156);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverviewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OverviewComponent = (function () {
    function OverviewComponent(modelService) {
        this.modelService = modelService;
        this.dateFormat = __WEBPACK_IMPORTED_MODULE_2__config_invoice__["a" /* INVOICE */].dateFormat;
    }
    OverviewComponent.prototype.ngOnInit = function () {
        this.projects = this.modelService.getProjects();
    };
    OverviewComponent.prototype.onPaidChange = function () {
        this.modelService.save();
    };
    OverviewComponent.data = {
        title: 'Overview',
        heading: 'Overview',
        meta: { description: 'Welcome to Overview' }
    };
    OverviewComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-overview',
            template: __webpack_require__(642),
            styles: [__webpack_require__(615)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__model_model_service__["a" /* ModelService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__model_model_service__["a" /* ModelService */]) === 'function' && _a) || Object])
    ], OverviewComponent);
    return OverviewComponent;
    var _a;
}());
//# sourceMappingURL=overview.component.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_model_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__abstract_saveable__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_invoice__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__signals__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProjectComponent = (function (_super) {
    __extends(ProjectComponent, _super);
    function ProjectComponent(modelService, router, route) {
        var _this = this;
        _super.call(this, modelService, __WEBPACK_IMPORTED_MODULE_6__signals__["e" /* modelAble */].SAVE | __WEBPACK_IMPORTED_MODULE_6__signals__["e" /* modelAble */].DELETE);
        this.modelService = modelService;
        this.router = router;
        this.route = route;
        this.INVOICE = __WEBPACK_IMPORTED_MODULE_4__config_invoice__["a" /* INVOICE */];
        __WEBPACK_IMPORTED_MODULE_6__signals__["f" /* modelAction */].add(function (state) {
            state === __WEBPACK_IMPORTED_MODULE_6__signals__["f" /* modelAction */].DELETE && _this.onDelete() ||
                state === __WEBPACK_IMPORTED_MODULE_6__signals__["f" /* modelAction */].SAVE && _this.checkInvoiceNumberBeforeSave();
        });
    }
    ProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.subscription = this.route.params.subscribe(function (params) {
            var clientNr = params['clientNr'] << 0;
            _this.projectId = params['projectNr'];
            _this.client = _this.modelService.getClientByNr(clientNr);
            _this.projectProper = _this.modelService.getProject(_this.projectId);
            _this.project = _this.setModel(_this.projectProper);
        });
    };
    ProjectComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.subscription.unsubscribe();
    };
    ProjectComponent.prototype.onDelete = function () {
        var isDeleted = _super.prototype.onDelete.call(this, this.modelService.removeProject.bind(this.modelService));
        isDeleted && this.router.navigate(['/client/' + this.client.nr]);
        return isDeleted;
    };
    ProjectComponent.prototype.clone = function (project) {
        var clonedProject = this.modelService.cloneProject(project);
        this.router.navigate(['/client/' + clonedProject.clientNr + '/' + clonedProject.invoiceNr]);
    };
    ProjectComponent.prototype.onRemoveLine = function (line) {
        var lines = this.project.lines, i = lines.indexOf(line);
        i !== -1 && lines.splice(i, 1);
        this.checkModelDirty();
    };
    ProjectComponent.prototype.onAddLine = function () {
        this.project.lines.push({ amount: 0, hours: 0, vat: __WEBPACK_IMPORTED_MODULE_4__config_invoice__["a" /* INVOICE */].VAT_DEFAULT });
        this.checkModelDirty();
    };
    ProjectComponent.prototype.onAddInvoice = function () {
        var invoices = this.project.invoices; /*,
            numInvoices = invoices.length*/
        invoices.push({
            date: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__mixins__["a" /* dateTimeToDate */])(),
            type: this.project.invoices.length === 0 ? 'invoice' : 'reminder',
            interest: false,
            exhortation: false
        });
        // numInvoices===0&&this.checkInvoiceNumber()
        this.checkModelDirty();
    };
    ProjectComponent.prototype.onRemoveInvoice = function (invoice) {
        var invoices = this.project.invoices, i = invoices.indexOf(invoice);
        i !== -1 && invoices.splice(i, 1);
        this.checkModelDirty();
    };
    ProjectComponent.prototype.onClickCalculation = function (project, line) {
        line.amount = line.hours * project.hourlyRateDiscounted;
        this.checkModelDirty();
    };
    /*private checkInvoiceNumber() {
      modelAction.addOnce(action=>{
        if (action===modelAction.SAVE) {
          this.checkInvoiceNumberBeforeSave()
        }
      }, null, 1)
    }*/
    ProjectComponent.prototype.checkInvoiceNumberBeforeSave = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_6__signals__["a" /* modelBeforeSave */].addOnce(function () {
            _this.projectProper.invoiceNr = _this.modelService.calculateInvoiceNr(_this.projectProper);
            __WEBPACK_IMPORTED_MODULE_6__signals__["b" /* modelSaved */].addOnce(function () {
                _this.router.navigate([_this.projectProper.uri]);
            });
        });
    };
    ProjectComponent.prototype.cloneModel = function () {
        this.project = _super.prototype.cloneModel.call(this);
        return this.project;
    };
    ProjectComponent.data = {
        title: 'Project',
        heading: 'Project',
        meta: { description: 'Foo is the bar of all qux' }
    };
    ProjectComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-project',
            template: __webpack_require__(643),
            styles: [__webpack_require__(616)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__model_model_service__["a" /* ModelService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__model_model_service__["a" /* ModelService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === 'function' && _c) || Object])
    ], ProjectComponent);
    return ProjectComponent;
    var _a, _b, _c;
}(__WEBPACK_IMPORTED_MODULE_3__abstract_saveable__["a" /* Saveable */]));
//# sourceMappingURL=project.component.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_interpolation_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_model_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_invoice__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__filter_currency_format_pipe__ = __webpack_require__(158);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuarterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var QuarterComponent = (function () {
    function QuarterComponent(modelService, interpolationService, route) {
        this.modelService = modelService;
        this.interpolationService = interpolationService;
        this.route = route;
        this.csvTemplate = '';
        this.quarters = [[], [], [], []];
        this.year = (new Date).getFullYear();
        this.years = [];
        this.dateFormat = __WEBPACK_IMPORTED_MODULE_4__config_invoice__["a" /* INVOICE */].dateFormat;
    }
    QuarterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params.hasOwnProperty('year')) {
                _this.year = parseInt(params['year'], 10);
                _this.setQuarters();
            }
        });
        var config = this.modelService.getConfig();
        this.csvTemplate = config.csvTemplate;
        this.projects = this.modelService.getProjects().slice(0);
        this.setQuarters();
        this.years = this.projects.filter(function (project) { return project.invoices.length; }).map(function (project) {
            return project.year;
        }).filter(function (elem, pos, arr) {
            return arr.indexOf(elem) === pos;
        }).sort();
        this.elmCsv = this.csvRef.nativeElement;
        //
        // this.quarters.forEach(quarter=>{
        //   const arr = quarter as any
        //   // arr.totalDiscounted = quarter.map(project=>project.totalDiscounted).reduce((a, b)=>a+b)
        //   // arr.totalVatDiscounted = quarter.map(project=>project.totalVatDiscounted).reduce((a, b)=>a+b)
        //   // arr.totalIncDiscounted = quarter.map(project=>project.totalIncDiscounted).reduce((a, b)=>a+b)
        //   Object.defineProperty(arr, 'totalDiscounted', { set: function() { return this.quarter.map(project=>project.totalDiscounted).reduce((a, b)=>a+b); } });
        //   Object.defineProperty(arr, 'totalVatDiscounted', { set: function() { return this.quarter.map(project=>project.totalVatDiscounted).reduce((a, b)=>a+b); } });
        //   Object.defineProperty(arr, 'totalIncDiscounted', { set: function() { return this.quarter.map(project=>project.totalIncDiscounted).reduce((a, b)=>a+b); } });
        // })
    };
    QuarterComponent.prototype.setQuarters = function () {
        var _this = this;
        this.quarters.forEach(function (quarter) {
            quarter.length = 0;
        });
        this.projects && this.projects
            .filter(function (project) { return project.invoices.length && project.year === _this.year; })
            .forEach(function (project) {
            var monthNumber = project.date.getMonth();
            var quarter = Math.ceil((monthNumber + 1) / 3);
            _this.quarters[quarter - 1].push(project);
        });
    };
    QuarterComponent.prototype.onClickCsv = function (quarter) {
        var _this = this;
        var parsed = quarter.map(function (project) {
            var client = _this.modelService.getClientByNr(project.clientNr), invoice = project.invoices.slice(0).shift(), currencyPipe = new __WEBPACK_IMPORTED_MODULE_5__filter_currency_format_pipe__["a" /* CurrencyFormat */](), data = _this.modelService.getData().personal, currency = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return currencyPipe.transform.apply(currencyPipe, args);
            };
            return _this.interpolationService.parse(_this.csvTemplate, {
                project: project,
                client: client,
                invoice: invoice,
                data: data,
                currency: currency
            });
        });
        this.elmCsv.value = parsed.join('\n');
        if (this.elmCsv && this.elmCsv.select) {
            this.elmCsv.select();
            try {
                document.execCommand('copy');
                this.elmCsv.blur();
            }
            catch (err) {
                alert('please press Ctrl/Cmd+C to copy');
            }
        }
    };
    QuarterComponent.prototype.getTotalDiscounted = function (quarter) {
        var _this = this;
        var total = 0;
        if (quarter === undefined) {
            quarter = this.projects && this.projects
                .filter(function (project) { return project.invoices.length && project.year === _this.year; });
        }
        quarter
            .forEach(function (project) {
            total += project.totalDiscounted;
        });
        return total;
    };
    QuarterComponent.prototype.getTotalVatDiscounted = function (quarter) {
        var _this = this;
        var total = 0;
        if (quarter === undefined) {
            quarter = this.projects && this.projects
                .filter(function (project) { return project.invoices.length && project.year === _this.year; });
        }
        quarter
            .forEach(function (project) {
            total += project.totalVatDiscounted;
        });
        return total;
    };
    QuarterComponent.prototype.getTotalIncDiscounted = function (quarter) {
        var _this = this;
        var total = 0;
        if (quarter === undefined) {
            quarter = this.projects && this.projects
                .filter(function (project) { return project.invoices.length && project.year === _this.year; });
        }
        quarter
            .forEach(function (project) {
            total += project.totalIncDiscounted;
        });
        return total;
    };
    QuarterComponent.data = {
        title: 'Quarter',
        heading: 'Quarter',
        meta: { description: 'Welcome to Quarter' }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ViewChild */])('csv'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */]) === 'function' && _a) || Object)
    ], QuarterComponent.prototype, "csvRef", void 0);
    QuarterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-quarter',
            template: __webpack_require__(644),
            styles: [__webpack_require__(617)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__model_model_service__["a" /* ModelService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__model_model_service__["a" /* ModelService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__service_interpolation_service__["a" /* InterpolationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__service_interpolation_service__["a" /* InterpolationService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === 'function' && _d) || Object])
    ], QuarterComponent);
    return QuarterComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=quarter.component.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_model_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__abstract_saveable__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_client__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_project__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dummy_data__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__signals__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SettingsComponent = (function (_super) {
    __extends(SettingsComponent, _super);
    function SettingsComponent(modelService) {
        _super.call(this, modelService);
        this.modelService = modelService;
        this.selectStart = -1;
        this.selectEnd = -1;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.settings = this.setModel(this.modelService.getConfig());
        //
        var client = new __WEBPACK_IMPORTED_MODULE_3__model_client__["a" /* Client */](__WEBPACK_IMPORTED_MODULE_5__dummy_data__["a" /* default */].clients[0]);
        client.projects = client && client.projects.map(function (project) { return new __WEBPACK_IMPORTED_MODULE_4__model_project__["a" /* Project */](project, _this.modelService); });
        this.client = client;
        this.project = client && client.projects.slice(0).pop();
        this.invoice = this.project.invoices.slice(0).shift();
        __WEBPACK_IMPORTED_MODULE_6__signals__["c" /* cssChanged */].dispatch(this.settings.invoiceCSS);
        setTimeout(__WEBPACK_IMPORTED_MODULE_6__signals__["c" /* cssChanged */].dispatch.bind(__WEBPACK_IMPORTED_MODULE_6__signals__["c" /* cssChanged */], this.settings.invoiceCSS));
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        __WEBPACK_IMPORTED_MODULE_6__signals__["c" /* cssChanged */].dispatch();
    };
    SettingsComponent.prototype.onClickDownload = function (e, type) {
        var currentTarget = e.currentTarget, data = type === 'config' ? this.modelService.getConfig() : this.modelService.getData(), dataWithType = Object.assign(data, { type: type }), dataString = JSON.stringify(dataWithType);
        currentTarget.setAttribute('href', "data:text/json," + encodeURIComponent(dataString));
        currentTarget.setAttribute('download', "new_" + type + ".json");
    };
    SettingsComponent.prototype.onChangeRestore = function (e, type) {
        var _this = this;
        var target = e.target;
        var fileReader = new FileReader();
        var file = target.files[0];
        fileReader.readAsText(file);
        fileReader.addEventListener('load', function () {
            var result = fileReader.result, resultData = JSON.parse(result);
            if (resultData.type === type) {
                delete resultData.type;
                if (type === 'config') {
                    _this.settings = _this.setModel(_this.modelService.setConfig(resultData));
                }
                else if (type === 'data') {
                    _this.modelService.setData(resultData);
                }
            }
            target.value = null;
        });
    };
    SettingsComponent.prototype.onClickClear = function (type) {
        if (confirm("Do you really want to clear the " + type + "?")) {
            type === 'config' ? this.modelService.clearConfig() : this.modelService.clearData();
        }
    };
    SettingsComponent.prototype.onChangeCSS = function (css) {
        __WEBPACK_IMPORTED_MODULE_6__signals__["c" /* cssChanged */].dispatch(css);
    };
    SettingsComponent.prototype.onSelectCSS = function (e) {
        var target = e.target;
        this.selectStart = target.selectionStart;
        this.selectEnd = target.selectionEnd;
    };
    SettingsComponent.prototype.onBlurCSS = function () {
        var _this = this;
        this.blurTimeoutId = window.setTimeout(function () {
            _this.selectStart = -1;
            _this.selectEnd = -1;
        }, 1000);
    };
    SettingsComponent.prototype.onFocusImageInput = function () {
        // console.log('onFocusImageInput'); // todo: remove log
        clearTimeout(this.blurTimeoutId);
    };
    SettingsComponent.prototype.onChangeImage = function (e) {
        var _this = this;
        // console.log('onChangeImage',this.cssInsertable,this.selectStart,this.selectEnd); // todo: remove log
        if (this.cssInsertable) {
            clearTimeout(this.blurTimeoutId);
            var target_1 = e.target;
            var fileReader_1 = new FileReader();
            var file = target_1.files[0];
            fileReader_1.readAsDataURL(file);
            fileReader_1.addEventListener('load', function () {
                var result = fileReader_1.result;
                target_1.value = null;
                var s = _this.settings.invoiceCSS;
                _this.settings.invoiceCSS = s.substr(0, _this.selectStart) + result + s.substr(_this.selectEnd);
                __WEBPACK_IMPORTED_MODULE_6__signals__["c" /* cssChanged */].dispatch(_this.settings.invoiceCSS);
                _this.onNgModelChanged();
                _this.selectStart = -1;
                _this.selectEnd = -1;
            });
        }
    };
    Object.defineProperty(SettingsComponent.prototype, "cssInsertable", {
        get: function () {
            return this.selectStart !== -1 && this.selectEnd !== -1;
        },
        enumerable: true,
        configurable: true
    });
    SettingsComponent.prototype.onRevert = function () {
        _super.prototype.onRevert.call(this);
        __WEBPACK_IMPORTED_MODULE_6__signals__["c" /* cssChanged */].dispatch();
    };
    SettingsComponent.prototype.cloneModel = function () {
        return this.settings = _super.prototype.cloneModel.call(this);
    };
    SettingsComponent.data = {
        title: 'Settings',
        heading: 'Settings',
        meta: { robots: 'noindex, nofollow' }
    };
    SettingsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-settings',
            template: __webpack_require__(645),
            styles: [__webpack_require__(618)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__model_model_service__["a" /* ModelService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__model_model_service__["a" /* ModelService */]) === 'function' && _a) || Object])
    ], SettingsComponent);
    return SettingsComponent;
    var _a;
}(__WEBPACK_IMPORTED_MODULE_2__abstract_saveable__["a" /* Saveable */]));
//# sourceMappingURL=settings.component.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_src_dom_dom_adapter__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DOMHeadService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DOMHeadService = (function () {
    /**
     * Inject the Angular 2 Title Service
     * @param titleService
     */
    function DOMHeadService(titleService) {
        this.titleService = titleService;
        this.DOM = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_src_dom_dom_adapter__["b" /* getDOM */])();
        this.headElement = this.DOM.query('head');
        this.setTitle = this.titleService.setTitle;
        this.getTitle = this.titleService.getTitle;
    }
    DOMHeadService.prototype.getMetas = function () {
        var metas = {}, setObj = function (elm) {
            var name = elm.getAttribute('name');
            if (name) {
                metas[name] = elm.getAttribute('content');
            }
        };
        Array.prototype.forEach.call(this.headElement.querySelectorAll('meta'), setObj);
        return metas;
    };
    DOMHeadService.prototype.setMetas = function (metas, absolute) {
        var _this = this;
        if (absolute === void 0) { absolute = false; }
        var deleteMetas = [];
        if (absolute) {
            for (var name in this.getMetas()) {
                if (!metas || !metas.hasOwnProperty('name')) {
                    deleteMetas.push(name);
                }
            }
            deleteMetas.forEach(function (name) {
                var elm = _this.DOM.query('meta[name=' + name + ']');
                !elm && console.warn(name);
                elm && elm.parentNode.removeChild(elm);
            });
        }
        for (var name in metas) {
            if (metas.hasOwnProperty(name)) {
                this.setMeta(name, metas[name]);
            }
        }
    };
    DOMHeadService.prototype.setMeta = function (name, content) {
        var elm = this.DOM.query('meta[name=' + name + ']'), exists = !!elm;
        if (!exists) {
            elm = this.DOM.createElement('meta');
            elm.setAttribute('name', name);
        }
        elm.setAttribute('content', content);
        !exists && this.headElement.appendChild(elm);
        return exists;
    };
    DOMHeadService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */]) === 'function' && _a) || Object])
    ], DOMHeadService);
    return DOMHeadService;
    var _a;
}());
//# sourceMappingURL=dom.head.service.js.map

/***/ }),

/***/ 401:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 401;


/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(547);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_home_home_component__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_error404_error404_component__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_overview_overview_component__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_quarter_quarter_component__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_clients_clients_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_client_client_component__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_project_project_component__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_invoice_invoice_component__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__page_settings_settings_component__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__page_data_data_component__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__page_copy_copy_component__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__page_about_about_component__ = __webpack_require__(346);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__page_home_home_component__["a" /* HomeComponent */] },
    { path: 'overview', component: __WEBPACK_IMPORTED_MODULE_4__page_overview_overview_component__["a" /* OverviewComponent */] },
    { path: 'overview/quarter', component: __WEBPACK_IMPORTED_MODULE_5__page_quarter_quarter_component__["a" /* QuarterComponent */] },
    { path: 'overview/quarter/:year', component: __WEBPACK_IMPORTED_MODULE_5__page_quarter_quarter_component__["a" /* QuarterComponent */] },
    { path: 'overview/year', component: __WEBPACK_IMPORTED_MODULE_4__page_overview_overview_component__["a" /* OverviewComponent */] },
    { path: 'overview/year/:year', component: __WEBPACK_IMPORTED_MODULE_4__page_overview_overview_component__["a" /* OverviewComponent */] },
    { path: 'clients', component: __WEBPACK_IMPORTED_MODULE_6__page_clients_clients_component__["a" /* ClientsComponent */] },
    { path: 'client/:clientNr', component: __WEBPACK_IMPORTED_MODULE_7__page_client_client_component__["a" /* ClientComponent */] },
    { path: 'client/:clientNr/:projectNr', component: __WEBPACK_IMPORTED_MODULE_8__page_project_project_component__["a" /* ProjectComponent */] },
    { path: 'client/:clientNr/:projectNr/quotation', component: __WEBPACK_IMPORTED_MODULE_9__page_invoice_invoice_component__["a" /* InvoiceComponent */] },
    { path: 'client/:clientNr/:projectNr/invoice', component: __WEBPACK_IMPORTED_MODULE_9__page_invoice_invoice_component__["a" /* InvoiceComponent */] },
    { path: 'client/:clientNr/:projectNr/reminder/:reminderNr', component: __WEBPACK_IMPORTED_MODULE_9__page_invoice_invoice_component__["a" /* InvoiceComponent */] },
    { path: 'settings', component: __WEBPACK_IMPORTED_MODULE_10__page_settings_settings_component__["a" /* SettingsComponent */] },
    { path: 'data', component: __WEBPACK_IMPORTED_MODULE_11__page_data_data_component__["a" /* DataComponent */] },
    { path: 'copy', component: __WEBPACK_IMPORTED_MODULE_12__page_copy_copy_component__["a" /* CopyComponent */] },
    { path: 'about', component: __WEBPACK_IMPORTED_MODULE_13__page_about_about_component__["a" /* AboutComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_3__page_error404_error404_component__["a" /* Error404Component */] }
];
// apply data if present
appRoutes.forEach(function (route) {
    var component = route.component;
    component.data && (route.data = component.data);
});
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forRoot(appRoutes)
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_dom_head_service__ = __webpack_require__(358);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(router, headService) {
        var _this = this;
        this.router = router;
        this.headService = headService;
        router.events.subscribe(function (e) {
            if (e instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* NavigationEnd */]) {
                var activatedRoute = router.routerState.root;
                _this.heading = _this.getRouteData(activatedRoute, 'heading');
                headService.setTitle('Voice - ' + _this.getRouteData(activatedRoute, 'title'));
                headService.setMetas(_this.getRouteData(activatedRoute, 'meta'));
                //
                window.scrollTo(0, 0);
            }
        });
    }
    /**
     * Get data properties from activatedRoute
     * @param {ActivatedRoute} activatedRoute
     * @param {string} name
     * @returns {string}
     */
    AppComponent.prototype.getRouteData = function (activatedRoute, name) {
        var firstChild = activatedRoute.snapshot.firstChild, data = firstChild && firstChild.data;
        return data && data[name] || null;
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(626),
            styles: [__webpack_require__(601)] /*,
             encapsulation: ViewEncapsulation.None*/
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_dom_head_service__["a" /* DOMHeadService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__service_dom_head_service__["a" /* DOMHeadService */]) === 'function' && _b) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_app_config__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config_invoice_config__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_dom_head_service__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_rest_service__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_model_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__service_localisation_service__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__service_interpolation_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__component_footer_footer_component__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__component_header_header_component__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__component_saveable_buttons_saveable_buttons_component__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__component_currency_currency_component__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__component_foldable_definition_foldable_definition_component__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__component_lang_lang_component__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__app_routing_module__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__page_home_home_component__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__page_error404_error404_component__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__page_overview_overview_component__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__page_quarter_quarter_component__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__page_clients_clients_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__page_client_client_component__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__page_project_project_component__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__page_invoice_invoice_component__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__print_invoice_invoice_component__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__page_settings_settings_component__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__page_data_data_component__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__page_copy_copy_component__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__page_about_about_component__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__filter_object_pipe__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__filter_total_pipe__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__filter_name_pipe__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__filter_latest_client_pipe__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__filter_currency_format_pipe__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__filter_safe_html_pipe__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__filter_sort_pipe__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__filter_filter_pipe__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__component_interpolationUI_interpolationui_component__ = __webpack_require__(529);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_18__app_routing_module__["a" /* AppRoutingModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_12__component_footer_footer_component__["a" /* FooterComponent */],
                __WEBPACK_IMPORTED_MODULE_13__component_header_header_component__["a" /* HeaderComponent */],
                //
                __WEBPACK_IMPORTED_MODULE_19__page_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_20__page_error404_error404_component__["a" /* Error404Component */],
                __WEBPACK_IMPORTED_MODULE_21__page_overview_overview_component__["a" /* OverviewComponent */],
                __WEBPACK_IMPORTED_MODULE_22__page_quarter_quarter_component__["a" /* QuarterComponent */],
                __WEBPACK_IMPORTED_MODULE_23__page_clients_clients_component__["a" /* ClientsComponent */],
                __WEBPACK_IMPORTED_MODULE_24__page_client_client_component__["a" /* ClientComponent */],
                __WEBPACK_IMPORTED_MODULE_25__page_project_project_component__["a" /* ProjectComponent */],
                __WEBPACK_IMPORTED_MODULE_28__page_settings_settings_component__["a" /* SettingsComponent */],
                __WEBPACK_IMPORTED_MODULE_29__page_data_data_component__["a" /* DataComponent */],
                __WEBPACK_IMPORTED_MODULE_30__page_copy_copy_component__["a" /* CopyComponent */],
                __WEBPACK_IMPORTED_MODULE_31__page_about_about_component__["a" /* AboutComponent */],
                //
                __WEBPACK_IMPORTED_MODULE_32__filter_object_pipe__["a" /* ObjectPipe */],
                __WEBPACK_IMPORTED_MODULE_33__filter_total_pipe__["a" /* TotalPipe */],
                __WEBPACK_IMPORTED_MODULE_34__filter_name_pipe__["a" /* NamePipe */],
                __WEBPACK_IMPORTED_MODULE_37__filter_safe_html_pipe__["a" /* SafeHtmlPipe */],
                __WEBPACK_IMPORTED_MODULE_38__filter_sort_pipe__["a" /* ArraySortPipe */],
                __WEBPACK_IMPORTED_MODULE_39__filter_filter_pipe__["a" /* ArrayFilterPipe */],
                __WEBPACK_IMPORTED_MODULE_35__filter_latest_client_pipe__["a" /* LatestClientPipe */],
                __WEBPACK_IMPORTED_MODULE_36__filter_currency_format_pipe__["a" /* CurrencyFormat */],
                //
                __WEBPACK_IMPORTED_MODULE_14__component_saveable_buttons_saveable_buttons_component__["a" /* SaveableButtonsComponent */],
                __WEBPACK_IMPORTED_MODULE_26__page_invoice_invoice_component__["a" /* InvoiceComponent */],
                __WEBPACK_IMPORTED_MODULE_27__print_invoice_invoice_component__["a" /* PrintInvoiceComponent */],
                __WEBPACK_IMPORTED_MODULE_15__component_currency_currency_component__["a" /* CurrencyComponent */],
                __WEBPACK_IMPORTED_MODULE_16__component_foldable_definition_foldable_definition_component__["a" /* FoldableDefinitionComponent */],
                __WEBPACK_IMPORTED_MODULE_40__component_interpolationUI_interpolationui_component__["a" /* InterpolationUIComponent */],
                __WEBPACK_IMPORTED_MODULE_17__component_lang_lang_component__["a" /* LangComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* Title */],
                __WEBPACK_IMPORTED_MODULE_7__service_dom_head_service__["a" /* DOMHeadService */],
                __WEBPACK_IMPORTED_MODULE_8__service_rest_service__["a" /* RestService */],
                __WEBPACK_IMPORTED_MODULE_9__model_model_service__["a" /* ModelService */],
                __WEBPACK_IMPORTED_MODULE_11__service_interpolation_service__["a" /* InterpolationService */],
                __WEBPACK_IMPORTED_MODULE_10__service_localisation_service__["a" /* LocalisationService */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["c" /* DOCUMENT */], useValue: document },
                { provide: __WEBPACK_IMPORTED_MODULE_5__config_app_config__["a" /* APP_CONFIG */], useValue: __WEBPACK_IMPORTED_MODULE_5__config_app_config__["b" /* AppConfig */] },
                { provide: __WEBPACK_IMPORTED_MODULE_6__config_invoice_config__["a" /* INVOICE_CONFIG */], useValue: __WEBPACK_IMPORTED_MODULE_6__config_invoice_config__["b" /* InvoiceConfig */] }
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrencyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CurrencyComponent = (function () {
    function CurrencyComponent(elementRef) {
        this.elementRef = elementRef;
        elementRef.nativeElement.setAttribute('sign', '€');
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Input */])(), 
        __metadata('design:type', Number)
    ], CurrencyComponent.prototype, "amount", void 0);
    CurrencyComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-currency',
            template: __webpack_require__(627),
            styles: [__webpack_require__(602)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */]) === 'function' && _a) || Object])
    ], CurrencyComponent);
    return CurrencyComponent;
    var _a;
}());
//# sourceMappingURL=currency.component.js.map

/***/ }),

/***/ 526:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FoldableDefinitionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FoldableDefinitionComponent = (function () {
    function FoldableDefinitionComponent(element) {
        this.element = element;
        this.list = [];
        this.name = "fd" + ((Date.now() / Math.random()) << 0);
    }
    FoldableDefinitionComponent.prototype.ngOnInit = function () {
        var _this = this;
        var wrapper = this.element.nativeElement.querySelector('[data-list]');
        var list = wrapper && wrapper.querySelectorAll('dt,dd') || [];
        var dt;
        Array.from(list).forEach(function (element, index) {
            var elm = element;
            var nodeName = elm.nodeName;
            if (nodeName === 'DT') {
                dt = elm.innerHTML;
            }
            else if (nodeName === 'DD') {
                var dd = elm.innerHTML;
                _this.list.push({ dt: dt, dd: dd, index: index });
            }
        });
    };
    FoldableDefinitionComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-foldable-definition',
            template: __webpack_require__(628),
            styles: [__webpack_require__(603)],
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */]) === 'function' && _a) || Object])
    ], FoldableDefinitionComponent);
    return FoldableDefinitionComponent;
    var _a;
}());
//# sourceMappingURL=foldable-definition.component.js.map

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-footer',
            template: __webpack_require__(629),
            styles: [__webpack_require__(604)]
        }), 
        __metadata('design:paramtypes', [])
    ], FooterComponent);
    return FooterComponent;
}());
//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeaderComponent = (function () {
    function HeaderComponent(router) {
        var _this = this;
        this.router = router;
        this.active = 'active';
        this.dropped = false;
        router.events.subscribe(function (e) {
            if (e instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* NavigationEnd */]) {
                _this.dropped = false;
            }
        });
    }
    HeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-header',
            template: __webpack_require__(630),
            styles: [__webpack_require__(605)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _a) || Object])
    ], HeaderComponent);
    return HeaderComponent;
    var _a;
}());
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_interpolation_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_localisation_service__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_model_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__filter_currency_format_pipe__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_client__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_project__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dummy_data__ = __webpack_require__(157);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InterpolationUIComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var noop = function () { };
var id = 0;
var getId = function () { return id++; };
var InterpolationUIComponent = (function () {
    function InterpolationUIComponent(element, renderer, modelService, interpolationService, localisationService) {
        this.element = element;
        this.renderer = renderer;
        this.modelService = modelService;
        this.interpolationService = interpolationService;
        this.localisationService = localisationService;
        this.innerValue = '';
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.selectionStart = 0;
        this.selectionEnd = 0;
        this.isFocused = false;
        this.isOver = false;
        this.uiVisible = false;
        this.doLocalise = false;
        var client = new __WEBPACK_IMPORTED_MODULE_6__model_client__["a" /* Client */](__WEBPACK_IMPORTED_MODULE_8__dummy_data__["a" /* default */].clients[0]);
        client.projects = client && client.projects.map(function (project) { return new __WEBPACK_IMPORTED_MODULE_7__model_project__["a" /* Project */](project, modelService); });
        var project = client && client.projects.slice(0).pop(), invoice = project.invoices.slice(0).shift(), data = modelService.getData().personal, currencyPipe = new __WEBPACK_IMPORTED_MODULE_5__filter_currency_format_pipe__["a" /* CurrencyFormat */](), currency = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return currencyPipe.transform.apply(currencyPipe, args);
        };
        this.dummyModel = {
            client: client,
            project: project,
            invoice: invoice,
            data: data,
            currency: currency
        };
        this.__ = localisationService.__.bind(localisationService);
        this.id = 'interpolationui' + getId();
    }
    InterpolationUIComponent.prototype.ngOnInit = function () {
        this.doLocalise = this.localise !== undefined && this.localise !== 'false';
        this.elmTextarea = this.element.nativeElement.querySelector('textarea');
    };
    Object.defineProperty(InterpolationUIComponent.prototype, "value", {
        // ngOnDestroy(){}
        get: function () {
            return this.innerValue;
        },
        set: function (val) {
            if (val !== this.innerValue) {
                this.innerValue = val;
                this.onChangeCallback(val);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    InterpolationUIComponent.prototype.onFocus = function (e) {
        this.isFocused = true;
        this.uiVisible = true;
    };
    InterpolationUIComponent.prototype.onBlur = function (e) {
        this.isFocused = false;
        this.checkVisibility();
        this.onTouchedCallback();
        //
        var target = e.target;
        this.selectionStart = target.selectionStart;
        this.selectionEnd = target.selectionEnd;
    };
    InterpolationUIComponent.prototype.onMouseEnter = function (e) {
        this.isOver = true;
    };
    InterpolationUIComponent.prototype.onMouseLeave = function (e) {
        this.isOver = false;
        this.checkVisibility();
    };
    InterpolationUIComponent.prototype.onClickDummy = function (dummyKey, dummyProp) {
        this.value = this.value.substring(0, this.selectionStart) + "${" + dummyKey + "." + dummyProp + "}" + this.value.substring(this.selectionEnd);
        setTimeout(this.renderer.invokeElementMethod.bind(this.renderer, this.elmTextarea, 'focus'), 1);
    };
    InterpolationUIComponent.prototype.writeValue = function (value) {
        this.innerValue = value;
    };
    InterpolationUIComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    InterpolationUIComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    InterpolationUIComponent.prototype.setDisabledState = function (isDisabled) { };
    InterpolationUIComponent.prototype.parse = function (text) {
        if (this.doLocalise) {
            text = this.__(text || '');
        }
        return this.interpolate(text || '');
    };
    InterpolationUIComponent.prototype.interpolate = function (text) {
        return this.interpolationService.parse(text, this.dummyModel);
    };
    InterpolationUIComponent.prototype.checkVisibility = function () {
        var _this = this;
        clearTimeout(this.hideTimeout);
        this.hideTimeout = setTimeout(function () {
            _this.uiVisible = _this.isOver || _this.isFocused;
        }, 200);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Input */])(), 
        __metadata('design:type', String)
    ], InterpolationUIComponent.prototype, "localise", void 0);
    InterpolationUIComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-interpolationui',
            template: __webpack_require__(631),
            styles: [__webpack_require__(606)],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* NG_VALUE_ACCESSOR */], useExisting: InterpolationUIComponent, multi: true }
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Renderer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Renderer */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__model_model_service__["a" /* ModelService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__model_model_service__["a" /* ModelService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__service_interpolation_service__["a" /* InterpolationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__service_interpolation_service__["a" /* InterpolationService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__service_localisation_service__["a" /* LocalisationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__service_localisation_service__["a" /* LocalisationService */]) === 'function' && _e) || Object])
    ], InterpolationUIComponent);
    return InterpolationUIComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=interpolationui.component.js.map

/***/ }),

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_model_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LangComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LangComponent = (function () {
    function LangComponent(modelService) {
        this.modelService = modelService;
        this.config = this.modelService.config;
    }
    LangComponent.prototype.setLang = function (lang) {
        this.config.lang = lang;
        this.modelService.save();
    };
    LangComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-lang',
            template: __webpack_require__(632),
            styles: [__webpack_require__(607)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__model_model_service__["a" /* ModelService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__model_model_service__["a" /* ModelService */]) === 'function' && _a) || Object])
    ], LangComponent);
    return LangComponent;
    var _a;
}());
//# sourceMappingURL=lang.component.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__signals__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SaveableButtonsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SaveableButtonsComponent = (function () {
    function SaveableButtonsComponent() {
        var _this = this;
        this.isDeletable = false;
        this.isSaveable = false;
        this.isModelDirty = false;
        __WEBPACK_IMPORTED_MODULE_1__signals__["d" /* modelDirty */].add(function (dirty) { _this.isModelDirty = dirty; });
        __WEBPACK_IMPORTED_MODULE_1__signals__["e" /* modelAble */].add(function (abilities) {
            _this.isDeletable = !!(__WEBPACK_IMPORTED_MODULE_1__signals__["e" /* modelAble */].DELETE & abilities);
            _this.isSaveable = !!(__WEBPACK_IMPORTED_MODULE_1__signals__["e" /* modelAble */].SAVE & abilities);
        });
    }
    SaveableButtonsComponent.prototype.onSave = function () { __WEBPACK_IMPORTED_MODULE_1__signals__["f" /* modelAction */].dispatch(__WEBPACK_IMPORTED_MODULE_1__signals__["f" /* modelAction */].SAVE); };
    SaveableButtonsComponent.prototype.onRevert = function () { __WEBPACK_IMPORTED_MODULE_1__signals__["f" /* modelAction */].dispatch(__WEBPACK_IMPORTED_MODULE_1__signals__["f" /* modelAction */].REVERT); };
    SaveableButtonsComponent.prototype.onDelete = function () { __WEBPACK_IMPORTED_MODULE_1__signals__["f" /* modelAction */].dispatch(__WEBPACK_IMPORTED_MODULE_1__signals__["f" /* modelAction */].DELETE); };
    SaveableButtonsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-saveable-buttons',
            template: __webpack_require__(633)
        }), 
        __metadata('design:paramtypes', [])
    ], SaveableButtonsComponent);
    return SaveableButtonsComponent;
}());
//# sourceMappingURL=saveable-buttons.component.js.map

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppConfig; });

var APP_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* OpaqueToken */]('app.config');
var AppConfig = {
    apiEndpoint: 'http://localhost:15422/api/',
    uriData: '/data/'
};
//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return INVOICE_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return InvoiceConfig; });

var INVOICE_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* OpaqueToken */]('invoice.config');
var InvoiceConfig = {
    typeInvoice: 'invoice',
    typeReminder: 'reminder'
};
//# sourceMappingURL=invoice.config.js.map

/***/ }),

/***/ 534:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = {
    timestamp: Date.now(),
    theme: 'default',
    projectNumberTemplate: '${client.nr}.${project.indexOnClient+1}.${project.dateYear.substr(2,2)}.${project.indexOnYear+1}',
    invoiceCSS: "$bgColor: #BDDBE5;\n.invoice {\n  background-color: #FFF;\n\n  header, footer, tr.separate td:before, tr.add td.line:before {\n    background-color: $bgColor;\n  }\n  tr.add td:last-child:after {\n    color: $bgColor;\n  }\n  .total td:last-child:after  {\n    border-color: $bgColor;\n  }\n\n  #logo {\n    float: right;\n    position: static;\n    width: 80%;\n    height: 64px;\n    background: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><path fill-rule='evenodd' fill='#FFF' clip-rule='evenodd' d='M19.112,16.313l-6.102-4.633C10.774,9.88,9.716,7.902,9.838,5.749 c0.122-2.152,0.8-3.737,2.033-4.756l6.103,4.634c2.056,1.668,3.074,3.564,3.055,5.69S20.371,15.109,19.112,16.313z M6.835,16.168 c0.339-1.945,1.543-3.437,3.615-4.474l12.349,9.369c1.828,1.559,2.63,3.266,2.404,5.125c-0.225,1.859-1.443,3.465-3.657,4.818 L9.198,21.64C7.285,19.937,6.498,18.112,6.835,16.168z'/></svg>\") no-repeat;\n    background-position: top right;\n  }\n}",
    csvTemplate: '${project.invoiceNr}\\tD\\t${client.name}\\t${invoice.date}\\t${data.vatAmount}%\\t${currency(project.totalIncDiscounted,\'€\',2,\'.\',\',\')}\\tOmzet\\t${currency(project.totalDiscounted,\'€\',2,\'.\',\',\')}\\t${currency(project.totalVat,\'€\',2,\'.\',\',\')}\\tBank\\tKwartaal ${project.quarter+1}\\t${project.description}\\t${currency(project.totalIncDiscounted,\'€\',2,\'.\',\',\')}',
    langs: [
        'en',
        'nl'
    ],
    lang: 'en',
    type: 'config'
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrayFilterPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ArrayFilterPipe = (function () {
    function ArrayFilterPipe() {
    }
    ArrayFilterPipe.prototype.transform = function (array) {
        var filters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            filters[_i - 1] = arguments[_i];
        }
        filters.forEach(function (filter) {
            var key = filter.match(/\w+/).pop();
            var isNegate = filter.substr(0, 1) === '!';
            array = array.filter(function (o) { return !o[key] === isNegate; });
        });
        return array;
    };
    ArrayFilterPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Pipe */])({
            name: 'arrayFilter'
        }), 
        __metadata('design:paramtypes', [])
    ], ArrayFilterPipe);
    return ArrayFilterPipe;
}());
//# sourceMappingURL=filter.pipe.js.map

/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LatestClientPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LatestClientPipe = (function () {
    function LatestClientPipe() {
    }
    LatestClientPipe.prototype.transform = function (clients) {
        var _this = this;
        return clients.sort(function (a, b) {
            var latestA = _this.getLatestProjectDate(a), latestB = _this.getLatestProjectDate(b);
            return latestA > latestB ? -1 : 1;
        });
    };
    LatestClientPipe.prototype.getLatestProjectDate = function (client) {
        var latestDate = new Date(0);
        client.projects.forEach(function (project) {
            var projectDate = project.dateLatest;
            if (projectDate > latestDate) {
                latestDate = projectDate;
            }
        });
        return latestDate;
    };
    LatestClientPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Pipe */])({
            name: 'latestClient'
        }), 
        __metadata('design:paramtypes', [])
    ], LatestClientPipe);
    return LatestClientPipe;
}());
//# sourceMappingURL=latest-client.pipe.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NamePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NamePipe = (function () {
    function NamePipe() {
    }
    NamePipe.prototype.transform = function (value, name) {
        var lowerName = name.toLowerCase();
        return name === '' ? value : value.filter(function (item) { return item.name.toLowerCase().indexOf(lowerName) !== -1; });
    };
    NamePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Pipe */])({
            name: 'name'
        }), 
        __metadata('design:paramtypes', [])
    ], NamePipe);
    return NamePipe;
}());
//# sourceMappingURL=name.pipe.js.map

/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*
 * Usage:
 *   value | object
*/
var ObjectPipe = (function () {
    function ObjectPipe() {
    }
    ObjectPipe.prototype.transform = function (value, enumerable) {
        if (enumerable === void 0) { enumerable = true; }
        var dataArr = [];
        if (!enumerable) {
            for (var s in value) {
                dataArr.push({ key: s, value: value[s] });
            }
        }
        else {
            Object.keys(value).forEach(function (key) { return dataArr.push({ key: key, value: value[key] }); });
        }
        return dataArr;
    };
    ObjectPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Pipe */])({ name: 'object' }), 
        __metadata('design:paramtypes', [])
    ], ObjectPipe);
    return ObjectPipe;
}());
//# sourceMappingURL=object.pipe.js.map

/***/ }),

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(77);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafeHtmlPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafeHtmlPipe = (function () {
    function SafeHtmlPipe(sanitized) {
        this.sanitized = sanitized;
    }
    SafeHtmlPipe.prototype.transform = function (value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    };
    SafeHtmlPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Pipe */])({
            name: 'safeHtml'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["e" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["e" /* DomSanitizer */]) === 'function' && _a) || Object])
    ], SafeHtmlPipe);
    return SafeHtmlPipe;
    var _a;
}());
//# sourceMappingURL=safe-html.pipe.js.map

/***/ }),

/***/ 540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArraySortPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ArraySortPipe = (function () {
    function ArraySortPipe() {
    }
    ArraySortPipe.prototype.transform = function (array) {
        var sortBy = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sortBy[_i - 1] = arguments[_i];
        }
        array.sort(function (a, b) {
            var valueA = 1;
            var valueB = 1;
            var ascdesc = 1;
            sortBy.some(function (sort) {
                var key = sort.replace(/^[-+]/, '');
                ascdesc = /^-/.test(sort) ? -1 : 1;
                valueA = a[key];
                valueB = b[key];
                return valueA !== valueB;
            });
            return valueB < valueA ? ascdesc : -ascdesc;
        });
        return array;
    };
    ArraySortPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Pipe */])({
            name: 'arraySort'
        }), 
        __metadata('design:paramtypes', [])
    ], ArraySortPipe);
    return ArraySortPipe;
}());
//# sourceMappingURL=sort.pipe.js.map

/***/ }),

/***/ 541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TotalPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*
 * Usage:
 *   value | object
*/
var TotalPipe = (function () {
    function TotalPipe() {
    }
    TotalPipe.prototype.transform = function (value, property) {
        var total = 0;
        value.forEach(function (item) {
            total += item[property];
        });
        return total;
    };
    TotalPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Pipe */])({ name: 'total', pure: false }), 
        __metadata('design:paramtypes', [])
    ], TotalPipe);
    return TotalPipe;
}());
//# sourceMappingURL=total.pipe.js.map

/***/ }),

/***/ 542:
/***/ (function(module, exports) {

//# sourceMappingURL=client.js.map

/***/ }),

/***/ 543:
/***/ (function(module, exports) {

//# sourceMappingURL=invoice.js.map

/***/ }),

/***/ 544:
/***/ (function(module, exports) {

//# sourceMappingURL=project.js.map

/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_client__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interface_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interface_project__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interface_project___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__interface_project__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface_invoice__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface_invoice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__interface_invoice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_model_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_localisation_service__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_interpolation_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__filter_currency_format_pipe__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__signals__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintInvoiceComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PrintInvoiceComponent = (function () {
    function PrintInvoiceComponent(modelService, interpolationService, localisationService, elementRef) {
        this.modelService = modelService;
        this.interpolationService = interpolationService;
        this.localisationService = localisationService;
        this.elementRef = elementRef;
        this.__ = localisationService.__.bind(localisationService);
        this.sass = new Sass('./static/js/sass.worker.js');
    }
    PrintInvoiceComponent.prototype.ngOnInit = function () {
        this.copy = this.modelService.getCopy();
        this.personal = this.modelService.getPersonal();
        this.config = this.modelService.getConfig();
        this.localisationService.addExtra(this.project, 'project');
        this.localisationService.addExtra(this.client, 'client');
        this.setCustomStyle();
        this.binds = [this.setCustomStyle.bind(this)].map(function (bind) {
            __WEBPACK_IMPORTED_MODULE_8__signals__["c" /* cssChanged */].add(bind);
            return bind;
        });
    };
    PrintInvoiceComponent.prototype.ngOnDestroy = function () {
        this.binds.forEach(function (bind) { return __WEBPACK_IMPORTED_MODULE_8__signals__["c" /* cssChanged */].remove(bind); });
    };
    PrintInvoiceComponent.prototype.setCustomStyle = function (css) {
        var _this = this;
        if (css === void 0) { css = null; }
        !this.styleClone && Array.from(document.querySelectorAll('style')).forEach(function (style) {
            if (style.innerText === '{{config.invoiceCSS}}') {
                _this.styleClone = style.cloneNode(true);
                _this.elementRef.nativeElement.querySelector('.invoice').appendChild(_this.styleClone);
            }
        });
        this.sass.compile(css || this.config.invoiceCSS, this.onSassCompiled.bind(this));
    };
    PrintInvoiceComponent.prototype.onSassCompiled = function (result) {
        if (result.status === 0) {
            this.styleClone.textContent = result.text;
        }
    };
    PrintInvoiceComponent.prototype.parse = function (key) {
        var client = this.client, invoice = this.invoice, project = this.project, currencyPipe = new __WEBPACK_IMPORTED_MODULE_7__filter_currency_format_pipe__["a" /* CurrencyFormat */](), data = this.modelService.getData().personal, currency = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return currencyPipe.transform.apply(currencyPipe, args);
        };
        return this.interpolationService.parse(this.__(key), {
            project: project,
            client: client,
            invoice: invoice,
            data: data,
            currency: currency
        });
    };
    Object.defineProperty(PrintInvoiceComponent.prototype, "invoiceIndex", {
        get: function () {
            return this.project.invoices.indexOf(this.invoice);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__interface_project__["IProject"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__interface_project__["IProject"]) === 'function' && _a) || Object)
    ], PrintInvoiceComponent.prototype, "project", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Input */])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__interface_client__["IClient"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__interface_client__["IClient"]) === 'function' && _b) || Object)
    ], PrintInvoiceComponent.prototype, "client", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Input */])(), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__interface_invoice__["IInvoice"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__interface_invoice__["IInvoice"]) === 'function' && _c) || Object)
    ], PrintInvoiceComponent.prototype, "invoice", void 0);
    PrintInvoiceComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-print-invoice',
            template: __webpack_require__(646),
            styles: [__webpack_require__(619)],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* ViewEncapsulation */].None
        }), 
        __metadata('design:paramtypes', [(typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__model_model_service__["a" /* ModelService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__model_model_service__["a" /* ModelService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__service_interpolation_service__["a" /* InterpolationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__service_interpolation_service__["a" /* InterpolationService */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__service_localisation_service__["a" /* LocalisationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__service_localisation_service__["a" /* LocalisationService */]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* ElementRef */]) === 'function' && _g) || Object])
    ], PrintInvoiceComponent);
    return PrintInvoiceComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());
//# sourceMappingURL=invoice.component.js.map

/***/ }),

/***/ 546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RestService = (function () {
    function RestService(http) {
        this.http = http;
        this.cacheObject = {};
    }
    RestService.prototype.getRequest = function (endpoint, map, cache) {
        if (map === void 0) { map = function (r) { return r; }; }
        if (cache === void 0) { cache = true; }
        var cacheKey = JSON.stringify(endpoint), isCached = this.cacheObject.hasOwnProperty(cacheKey);
        return cache && isCached && Promise.resolve(this.cacheObject[cacheKey])
            || this.http.get(/*this.config.apiEndpoint+*/ endpoint).map(this.map.bind(this, map, cache, cacheKey)).toPromise();
    };
    RestService.prototype.map = function (mapping, cache, cacheKey, result) {
        var mappedResult = mapping(result);
        cache && (this.cacheObject[cacheKey] = mappedResult);
        return mappedResult;
    };
    RestService.prototype.load = function (uri) {
        return this.getRequest(uri, function (response) { return response.json(); });
    };
    RestService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object])
    ], RestService);
    return RestService;
    var _a;
}());
//# sourceMappingURL=rest.service.js.map

/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 601:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "app-header {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 40px;\n  z-index: 2; }\n\nmain {\n  min-height: 100%;\n  padding-top: 40px;\n  margin-bottom: -20px; }\n  @media (min-width: 576px) {\n    main h1 {\n      display: none; } }\n\napp-footer {\n  height: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 602:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ":host {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  text-align: right;\n  white-space: nowrap;\n  /*/deep/ .chunk:before, /deep/ .decimal:before {\r\n    content: attr(char);\r\n  }*/ }\n  :host:before {\n    content: attr(sign);\n    float: left; }\n  :host /deep/ .chunk:before, :host /deep/ .decimal:before {\n    content: attr(char); }\n  :host /deep/ .decimal {\n    position: relative; }\n    :host /deep/ .decimal:before {\n      position: absolute;\n      left: 0;\n      top: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 603:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "[data-list] {\n  display: none; }\n\ninput[type=radio] + * {\n  max-height: 0;\n  transition: max-height 200ms ease;\n  overflow: hidden; }\n\ninput[type=radio]:checked + * {\n  max-height: 300px; }\n\ndt:not(:first-of-type) {\n  border-top: 1px solid lightgray;\n  padding-top: 10px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 604:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "footer {\n  height: 20px;\n  background-color: #373737; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 605:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "header {\n  height: 40px;\n  max-width: 100vw;\n  background-color: #444;\n  color: white; }\n\nul {\n  margin: 0;\n  padding: 0;\n  list-style: none; }\n\nli {\n  position: relative;\n  vertical-align: top; }\n  li a {\n    line-height: 40px; }\n  @media (min-width: 576px) {\n    li.drop ul {\n      position: absolute;\n      left: 0;\n      top: 40px;\n      display: block;\n      min-width: 100%;\n      overflow: hidden; }\n      li.drop ul li:first-child {\n        margin-top: -80px;\n        transition: margin-top ease 300ms; }\n    li.drop:hover ul li:first-child, li.drop > input:checked + ul li:first-child {\n      margin-top: 0; } }\n  li li li {\n    padding-right: 2em; }\n\nlabel {\n  margin: 0;\n  padding: 0; }\n\na {\n  display: block;\n  padding: 0 1em;\n  color: inherit;\n  transition: background-color 200ms linear; }\n  a:hover {\n    text-decoration: none; }\n  a.active {\n    background-color: dimgray; }\n\n.buttons {\n  padding-top: 5.71429px;\n  padding-right: 0.5em; }\n\nnav > ul {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end; }\n  nav > ul > li:first-child {\n    -webkit-box-ordinal-group: 10;\n        -ms-flex-order: 9;\n            order: 9; }\n\nnav [for=hamburger] {\n  position: relative;\n  display: block;\n  width: 20px;\n  height: 20px;\n  margin-top: 10px;\n  border-top: 4px solid white;\n  border-bottom: 4px solid white; }\n  @media (min-width: 576px) {\n    nav [for=hamburger] {\n      display: none; } }\n  nav [for=hamburger]:after {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 0;\n    -webkit-transform: translateY(-2px);\n            transform: translateY(-2px);\n    width: 100%;\n    border-top: 4px solid white; }\n\nnav #hamburger ~ ul {\n  display: none;\n  left: 0;\n  top: 40px;\n  width: 100vw;\n  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3); }\n  @media (min-width: 576px) {\n    nav #hamburger ~ ul {\n      box-shadow: none; } }\n  nav #hamburger ~ ul .list-inline-item {\n    display: block;\n    min-height: 40px; }\n    @media (min-width: 576px) {\n      nav #hamburger ~ ul .list-inline-item {\n        display: inline-block; } }\n\nnav #hamburger:checked ~ ul {\n  display: block;\n  position: fixed; }\n\n@media (min-width: 576px) {\n  nav #hamburger ~ ul,\n  nav #hamburger:checked ~ ul {\n    display: inline;\n    position: initial; }\n    nav #hamburger ~ ul > li,\n    nav #hamburger:checked ~ ul > li {\n      display: inline-block; } }\n\nnav > ul {\n  text-align: right; }\n  @media (min-width: 576px) {\n    nav > ul {\n      text-align: center;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between; }\n      nav > ul > li:first-child {\n        -webkit-box-ordinal-group: initial;\n            -ms-flex-order: initial;\n                order: initial; } }\n  nav > ul > li {\n    display: inline-block; }\n    nav > ul > li ul {\n      background-color: #444; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 606:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ".interpolationui {\n  position: relative; }\n  .interpolationui textarea {\n    min-height: 30px;\n    transition: min-height 300ms ease;\n    overflow: hidden; }\n  .interpolationui .ui {\n    max-height: 0;\n    padding-bottom: 0;\n    overflow: hidden;\n    transition: max-height 300ms ease, padding-bottom 300ms ease; }\n  .interpolationui.ui-visible textarea {\n    min-height: 150px;\n    overflow: initial; }\n  .interpolationui.ui-visible .ui {\n    max-height: 400px;\n    padding-bottom: 20px; }\n  .interpolationui .dummy-model {\n    position: relative;\n    margin: 0;\n    z-index: 1;\n    width: 100%;\n    pointer-events: none; }\n    .interpolationui .dummy-model ul {\n      position: absolute;\n      left: 0;\n      top: 24px;\n      z-index: 1;\n      width: 100%;\n      max-height: 0;\n      overflow: hidden;\n      transition: height 300ms ease; }\n    .interpolationui .dummy-model input:checked + label.btn.btn-sm {\n      background-color: #86d2c1; }\n      .interpolationui .dummy-model input:checked + label.btn.btn-sm + ul {\n        max-height: 200px; }\n    .interpolationui .dummy-model label.btn.btn-sm {\n      background-color: #b1bcd7;\n      font-size: 10px;\n      margin: 0;\n      padding: 0.125rem 0.25rem;\n      cursor: pointer;\n      pointer-events: initial; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 607:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "header {\n  height: 40px;\n  background-color: #444;\n  color: white; }\n  header a {\n    color: inherit; }\n  header ul {\n    list-style: none; }\n\nul {\n  margin: 0;\n  padding: 0; }\n\nli {\n  position: relative;\n  padding: 0 10px;\n  vertical-align: top; }\n  li a {\n    line-height: 40px; }\n\n.buttons {\n  padding-top: 5.71429px; }\n\nnav > ul {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end; }\n  nav > ul > li:first-child {\n    -webkit-box-ordinal-group: 10;\n        -ms-flex-order: 9;\n            order: 9; }\n\nnav [for=hamburger] {\n  position: relative;\n  display: block;\n  width: 20px;\n  height: 20px;\n  margin-top: 10px;\n  border-top: 4px solid white;\n  border-bottom: 4px solid white; }\n  nav [for=hamburger]:after {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 0;\n    -webkit-transform: translateY(-2px);\n            transform: translateY(-2px);\n    width: 100%;\n    border-top: 4px solid white; }\n\nnav #hamburger ~ ul {\n  display: none;\n  left: 0;\n  top: 40px;\n  width: 100vw; }\n\nnav #hamburger ~ ul .list-inline-item {\n  display: block;\n  min-height: 40px; }\n\nnav #hamburger:checked ~ ul {\n  display: block;\n  position: fixed; }\n\nnav > ul {\n  text-align: center; }\n  nav > ul > li {\n    display: inline-block; }\n    nav > ul > li ul {\n      background-color: #444; }\n\n@media (min-width: 768px) {\n  nav > ul {\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between; }\n    nav > ul > li:first-child {\n      -webkit-box-ordinal-group: initial;\n          -ms-flex-order: initial;\n              order: initial; }\n  nav [for=hamburger] {\n    display: none; }\n  nav #hamburger ~ ul .list-inline-item {\n    display: inline-block; }\n  nav #hamburger ~ ul,\n  nav #hamburger:checked ~ ul {\n    display: inline;\n    position: initial; }\n    nav #hamburger ~ ul > li,\n    nav #hamburger:checked ~ ul > li {\n      display: inline-block; } }\n\nli.drop label {\n  min-height: 40px;\n  margin: 0;\n  padding: 0; }\n\nli.drop ul {\n  display: block;\n  min-width: 100%;\n  overflow: hidden; }\n  li.drop ul li:first-child {\n    margin-top: -80px;\n    transition: margin-top ease 300ms; }\n\nli.drop:hover ul li:first-child, li.drop > input:checked + ul li:first-child {\n  margin-top: 0; }\n\n@media (min-width: 768px) {\n  li.drop ul {\n    position: absolute;\n    left: 0;\n    top: 40px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 608:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "td:nth-child(2) {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 609:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 610:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 611:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "section {\n  position: relative; }\n\ndl.row.clone {\n  position: absolute;\n  width: 100%;\n  left: 0;\n  top: 0;\n  pointer-events: none;\n  opacity: 0.5;\n  background-color: red; }\n\ndl.row dt {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 30%;\n          flex: 0 0 30%;\n  overflow: hidden;\n  text-overflow: ellipsis; }\n  dl.row dt + dd {\n    position: relative;\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 80%;\n            flex: 0 0 80%;\n    padding-right: 30px;\n    /*& + dd {\r\n        flex: 0 0 20%;\r\n      }*/ }\n    dl.row dt + dd button {\n      position: absolute;\n      right: 0;\n      top: 0;\n      background: initial; }\n\ntextarea {\n  height: 80px; }\n  textarea:focus {\n    height: 160px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 612:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 613:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ".jumbotron {\n  position: relative;\n  padding-left: 0;\n  padding-right: 0;\n  border: 0;\n  font-size: 2em;\n  background-color: #3f5267;\n  color: white;\n  box-shadow: 400px 0 0 #3f5267, -400px 0 0 #3f5267, 100px 0 0 #3f5267, -100px 0 0 #3f5267; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 614:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "app-print-invoice {\n  display: block;\n  width: 210mm;\n  height: 296.9mm;\n  margin: 0 auto 60px;\n  position: relative;\n  z-index: 1;\n  zoom: .4;\n  font-family: \"Istok Web\",\"Helvetica Neue\",Helvetica,Arial,sans-serif; }\n  @media (min-width: 576px) {\n    app-print-invoice {\n      zoom: .6; } }\n\n.invoice-shade {\n  position: relative;\n  display: block;\n  height: 0;\n  zoom: .399; }\n  @media (min-width: 576px) {\n    .invoice-shade {\n      zoom: .599; } }\n  .invoice-shade div {\n    position: relative;\n    left: 50%;\n    width: 210mm;\n    height: 296.9mm;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n    .invoice-shade div:before, .invoice-shade div:after {\n      content: '';\n      position: absolute;\n      left: 4%;\n      top: 1%;\n      width: 92%;\n      height: 98%;\n      box-shadow: 4px 8px 64px rgba(0, 0, 0, 0.4); }\n    .invoice-shade div:before {\n      -webkit-transform: skewX(3deg);\n              transform: skewX(3deg); }\n    .invoice-shade div:after {\n      -webkit-transform: skewX(-3deg);\n              transform: skewX(-3deg); }\n\n.invoice {\n  position: relative;\n  z-index: 1;\n  width: 210mm;\n  height: 296.9mm;\n  font-family: \"Istok Web\",\"Helvetica Neue\",Helvetica,Arial,sans-serif; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 615:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* You can add global styles to this file, and also import other style files */\n/*!\n * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)\n * Copyright 2011-2017 The Bootstrap Authors\n * Copyright 2011-2017 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nfigcaption,\nfigure,\nmain {\n  display: block; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible; }\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\na {\n  background-color: transparent;\n  -webkit-text-decoration-skip: objects; }\n\na:active,\na:hover {\n  outline-width: 0; }\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline;\n  text-decoration: underline dotted; }\n\nb,\nstrong {\n  font-weight: inherit; }\n\nb,\nstrong {\n  font-weight: bolder; }\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\ndfn {\n  font-style: italic; }\n\nmark {\n  background-color: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\naudio,\nvideo {\n  display: inline-block; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\nimg {\n  border-style: none; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  font-size: 100%;\n  line-height: 1.15;\n  margin: 0; }\n\nbutton,\ninput {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0;\n  white-space: normal; }\n\nprogress {\n  display: inline-block;\n  vertical-align: baseline; }\n\ntextarea {\n  overflow: auto; }\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px; }\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit; }\n\ndetails,\nmenu {\n  display: block; }\n\nsummary {\n  display: list-item; }\n\ncanvas {\n  display: inline-block; }\n\ntemplate {\n  display: none; }\n\n[hidden] {\n  display: none; }\n\n@media print {\n  *,\n  *::before,\n  *::after,\n  p::first-letter,\n  div::first-letter,\n  blockquote::first-letter,\n  li::first-letter,\n  p::first-line,\n  div::first-line,\n  blockquote::first-line,\n  li::first-line {\n    text-shadow: none !important;\n    box-shadow: none !important; }\n  a,\n  a:visited {\n    text-decoration: underline; }\n  abbr[title]::after {\n    content: \" (\" attr(title) \")\"; }\n  pre {\n    white-space: pre-wrap !important; }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; }\n  .navbar {\n    display: none; }\n  .badge {\n    border: 1px solid #000; }\n  .table, table {\n    border-collapse: collapse !important; }\n    .table td, table td,\n    .table th, table th {\n      background-color: #fff !important; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important; } }\n\nhtml {\n  box-sizing: border-box; }\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit; }\n\n@-ms-viewport {\n  width: device-width; }\n\nhtml {\n  -ms-overflow-style: scrollbar;\n  -webkit-tap-highlight-color: transparent; }\n\nbody {\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.5;\n  color: #292b2c;\n  background-color: #fff; }\n\n[tabindex=\"-1\"]:focus {\n  outline: none !important; }\n\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: .5rem; }\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nabbr[title],\nabbr[data-original-title] {\n  cursor: help; }\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit; }\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0; }\n\ndt {\n  font-weight: bold; }\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0; }\n\nblockquote {\n  margin: 0 0 1rem; }\n\na {\n  color: #0275d8;\n  text-decoration: none; }\n  a:focus, a:hover {\n    color: #014c8c;\n    text-decoration: underline; }\n\na:not([href]):not([tabindex]) {\n  color: inherit;\n  text-decoration: none; }\n  a:not([href]):not([tabindex]):focus, a:not([href]):not([tabindex]):hover {\n    color: inherit;\n    text-decoration: none; }\n  a:not([href]):not([tabindex]):focus {\n    outline: 0; }\n\npre {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto; }\n\nfigure {\n  margin: 0 0 1rem; }\n\nimg {\n  vertical-align: middle; }\n\n[role=\"button\"] {\n  cursor: pointer; }\n\na,\narea,\nbutton,\n[role=\"button\"],\ninput,\nlabel,\nselect,\nsummary,\ntextarea {\n  -ms-touch-action: manipulation;\n      touch-action: manipulation; }\n\ntable {\n  border-collapse: collapse;\n  background-color: transparent; }\n\ncaption {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #636c72;\n  text-align: left;\n  caption-side: bottom; }\n\nth {\n  text-align: left; }\n\nlabel {\n  display: inline-block;\n  margin-bottom: .5rem; }\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  line-height: inherit; }\n\ninput[type=\"radio\"]:disabled,\ninput[type=\"checkbox\"]:disabled {\n  cursor: not-allowed; }\n\ninput[type=\"date\"],\ninput[type=\"time\"],\ninput[type=\"datetime-local\"],\ninput[type=\"month\"] {\n  -webkit-appearance: listbox; }\n\ntextarea {\n  resize: vertical; }\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: .5rem;\n  font-size: 1.5rem;\n  line-height: inherit; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: none; }\n\noutput {\n  display: inline-block; }\n\n[hidden] {\n  display: none !important; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  margin-bottom: 0.5rem;\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit; }\n\nh1, .h1 {\n  font-size: 2.5rem; }\n\nh2, .h2 {\n  font-size: 2rem; }\n\nh3, .h3 {\n  font-size: 1.75rem; }\n\nh4, .h4 {\n  font-size: 1.5rem; }\n\nh5, .h5 {\n  font-size: 1.25rem; }\n\nh6, .h6 {\n  font-size: 1rem; }\n\n.lead {\n  font-size: 1.25rem;\n  font-weight: 300; }\n\n.display-1 {\n  font-size: 6rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-2 {\n  font-size: 5.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-3 {\n  font-size: 4.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-4 {\n  font-size: 3.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\nhr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1); }\n\nsmall,\n.small {\n  font-size: 80%;\n  font-weight: normal; }\n\nmark,\n.mark {\n  padding: 0.2em;\n  background-color: #fcf8e3; }\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline-item {\n  display: inline-block; }\n  .list-inline-item:not(:last-child) {\n    margin-right: 5px; }\n\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase; }\n\n.blockquote {\n  padding: 0.5rem 1rem;\n  margin-bottom: 1rem;\n  font-size: 1.25rem;\n  border-left: 0.25rem solid #eceeef; }\n\n.blockquote-footer {\n  display: block;\n  font-size: 80%;\n  color: #636c72; }\n  .blockquote-footer::before {\n    content: \"\\2014   \\A0\"; }\n\n.blockquote-reverse {\n  padding-right: 1rem;\n  padding-left: 0;\n  text-align: right;\n  border-right: 0.25rem solid #eceeef;\n  border-left: 0; }\n\n.blockquote-reverse .blockquote-footer::before {\n  content: \"\"; }\n\n.blockquote-reverse .blockquote-footer::after {\n  content: \"\\A0   \\2014\"; }\n\n.img-fluid {\n  max-width: 100%;\n  height: auto; }\n\n.img-thumbnail {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 0.25rem;\n  transition: all 0.2s ease-in-out;\n  max-width: 100%;\n  height: auto; }\n\n.figure {\n  display: inline-block; }\n\n.figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1; }\n\n.figure-caption {\n  font-size: 90%;\n  color: #636c72; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; }\n\ncode {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #bd4147;\n  background-color: #f7f7f9;\n  border-radius: 0.25rem; }\n  a > code {\n    padding: 0;\n    color: inherit;\n    background-color: inherit; }\n\nkbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #fff;\n  background-color: #292b2c;\n  border-radius: 0.2rem; }\n  kbd kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: bold; }\n\npre {\n  display: block;\n  margin-top: 0;\n  margin-bottom: 1rem;\n  font-size: 90%;\n  color: #292b2c; }\n  pre code {\n    padding: 0;\n    font-size: inherit;\n    color: inherit;\n    background-color: transparent;\n    border-radius: 0; }\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll; }\n\n.container {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 576px) {\n    .container {\n      width: 540px;\n      max-width: 100%; } }\n  @media (min-width: 768px) {\n    .container {\n      width: 720px;\n      max-width: 100%; } }\n  @media (min-width: 992px) {\n    .container {\n      width: 960px;\n      max-width: 100%; } }\n  @media (min-width: 1200px) {\n    .container {\n      width: 1140px;\n      max-width: 100%; } }\n\n.container-fluid {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n\n.row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px; }\n  @media (min-width: 576px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 768px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 992px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 1200px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n\n.no-gutters {\n  margin-right: 0;\n  margin-left: 0; }\n  .no-gutters > .col,\n  .no-gutters > [class*=\"col-\"] {\n    padding-right: 0;\n    padding-left: 0; }\n\n.col-1, .col-2, .col-3, .col-4, dl.row dt, .col-5, .col-6, .col-7, .col-8, dl.row dd, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n  position: relative;\n  width: 100%;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .col-1, .col-2, .col-3, .col-4, dl.row dt, .col-5, .col-6, .col-7, .col-8, dl.row dd, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .col-1, .col-2, .col-3, .col-4, dl.row dt, .col-5, .col-6, .col-7, .col-8, dl.row dd, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .col-1, .col-2, .col-3, .col-4, dl.row dt, .col-5, .col-6, .col-7, .col-8, dl.row dd, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .col-1, .col-2, .col-3, .col-4, dl.row dt, .col-5, .col-6, .col-7, .col-8, dl.row dd, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n\n.col {\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  max-width: 100%; }\n\n.col-auto {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n  width: auto; }\n\n.col-1 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 8.33333%;\n          flex: 0 0 8.33333%;\n  max-width: 8.33333%; }\n\n.col-2 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 16.66667%;\n          flex: 0 0 16.66667%;\n  max-width: 16.66667%; }\n\n.col-3 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 25%;\n          flex: 0 0 25%;\n  max-width: 25%; }\n\n.col-4, dl.row dt {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 33.33333%;\n          flex: 0 0 33.33333%;\n  max-width: 33.33333%; }\n\n.col-5 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 41.66667%;\n          flex: 0 0 41.66667%;\n  max-width: 41.66667%; }\n\n.col-6 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 50%;\n          flex: 0 0 50%;\n  max-width: 50%; }\n\n.col-7 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 58.33333%;\n          flex: 0 0 58.33333%;\n  max-width: 58.33333%; }\n\n.col-8, dl.row dd {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 66.66667%;\n          flex: 0 0 66.66667%;\n  max-width: 66.66667%; }\n\n.col-9 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 75%;\n          flex: 0 0 75%;\n  max-width: 75%; }\n\n.col-10 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 83.33333%;\n          flex: 0 0 83.33333%;\n  max-width: 83.33333%; }\n\n.col-11 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 91.66667%;\n          flex: 0 0 91.66667%;\n  max-width: 91.66667%; }\n\n.col-12 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 100%;\n          flex: 0 0 100%;\n  max-width: 100%; }\n\n.pull-0 {\n  right: auto; }\n\n.pull-1 {\n  right: 8.33333%; }\n\n.pull-2 {\n  right: 16.66667%; }\n\n.pull-3 {\n  right: 25%; }\n\n.pull-4 {\n  right: 33.33333%; }\n\n.pull-5 {\n  right: 41.66667%; }\n\n.pull-6 {\n  right: 50%; }\n\n.pull-7 {\n  right: 58.33333%; }\n\n.pull-8 {\n  right: 66.66667%; }\n\n.pull-9 {\n  right: 75%; }\n\n.pull-10 {\n  right: 83.33333%; }\n\n.pull-11 {\n  right: 91.66667%; }\n\n.pull-12 {\n  right: 100%; }\n\n.push-0 {\n  left: auto; }\n\n.push-1 {\n  left: 8.33333%; }\n\n.push-2 {\n  left: 16.66667%; }\n\n.push-3 {\n  left: 25%; }\n\n.push-4 {\n  left: 33.33333%; }\n\n.push-5 {\n  left: 41.66667%; }\n\n.push-6 {\n  left: 50%; }\n\n.push-7 {\n  left: 58.33333%; }\n\n.push-8 {\n  left: 66.66667%; }\n\n.push-9 {\n  left: 75%; }\n\n.push-10 {\n  left: 83.33333%; }\n\n.push-11 {\n  left: 91.66667%; }\n\n.push-12 {\n  left: 100%; }\n\n.offset-1 {\n  margin-left: 8.33333%; }\n\n.offset-2 {\n  margin-left: 16.66667%; }\n\n.offset-3 {\n  margin-left: 25%; }\n\n.offset-4 {\n  margin-left: 33.33333%; }\n\n.offset-5 {\n  margin-left: 41.66667%; }\n\n.offset-6 {\n  margin-left: 50%; }\n\n.offset-7 {\n  margin-left: 58.33333%; }\n\n.offset-8 {\n  margin-left: 66.66667%; }\n\n.offset-9 {\n  margin-left: 75%; }\n\n.offset-10 {\n  margin-left: 83.33333%; }\n\n.offset-11 {\n  margin-left: 91.66667%; }\n\n@media (min-width: 576px) {\n  .col-sm {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-sm-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-sm-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333%;\n            flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-sm-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66667%;\n            flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-sm-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-sm-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333%;\n            flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-sm-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66667%;\n            flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-sm-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-sm-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333%;\n            flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-sm-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66667%;\n            flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-sm-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-sm-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333%;\n            flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-sm-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66667%;\n            flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-sm-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-sm-0 {\n    right: auto; }\n  .pull-sm-1 {\n    right: 8.33333%; }\n  .pull-sm-2 {\n    right: 16.66667%; }\n  .pull-sm-3 {\n    right: 25%; }\n  .pull-sm-4 {\n    right: 33.33333%; }\n  .pull-sm-5 {\n    right: 41.66667%; }\n  .pull-sm-6 {\n    right: 50%; }\n  .pull-sm-7 {\n    right: 58.33333%; }\n  .pull-sm-8 {\n    right: 66.66667%; }\n  .pull-sm-9 {\n    right: 75%; }\n  .pull-sm-10 {\n    right: 83.33333%; }\n  .pull-sm-11 {\n    right: 91.66667%; }\n  .pull-sm-12 {\n    right: 100%; }\n  .push-sm-0 {\n    left: auto; }\n  .push-sm-1 {\n    left: 8.33333%; }\n  .push-sm-2 {\n    left: 16.66667%; }\n  .push-sm-3 {\n    left: 25%; }\n  .push-sm-4 {\n    left: 33.33333%; }\n  .push-sm-5 {\n    left: 41.66667%; }\n  .push-sm-6 {\n    left: 50%; }\n  .push-sm-7 {\n    left: 58.33333%; }\n  .push-sm-8 {\n    left: 66.66667%; }\n  .push-sm-9 {\n    left: 75%; }\n  .push-sm-10 {\n    left: 83.33333%; }\n  .push-sm-11 {\n    left: 91.66667%; }\n  .push-sm-12 {\n    left: 100%; }\n  .offset-sm-0 {\n    margin-left: 0%; }\n  .offset-sm-1 {\n    margin-left: 8.33333%; }\n  .offset-sm-2 {\n    margin-left: 16.66667%; }\n  .offset-sm-3 {\n    margin-left: 25%; }\n  .offset-sm-4 {\n    margin-left: 33.33333%; }\n  .offset-sm-5 {\n    margin-left: 41.66667%; }\n  .offset-sm-6 {\n    margin-left: 50%; }\n  .offset-sm-7 {\n    margin-left: 58.33333%; }\n  .offset-sm-8 {\n    margin-left: 66.66667%; }\n  .offset-sm-9 {\n    margin-left: 75%; }\n  .offset-sm-10 {\n    margin-left: 83.33333%; }\n  .offset-sm-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 768px) {\n  .col-md {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-md-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-md-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333%;\n            flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-md-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66667%;\n            flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-md-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-md-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333%;\n            flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-md-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66667%;\n            flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-md-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-md-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333%;\n            flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-md-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66667%;\n            flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-md-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-md-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333%;\n            flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-md-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66667%;\n            flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-md-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-md-0 {\n    right: auto; }\n  .pull-md-1 {\n    right: 8.33333%; }\n  .pull-md-2 {\n    right: 16.66667%; }\n  .pull-md-3 {\n    right: 25%; }\n  .pull-md-4 {\n    right: 33.33333%; }\n  .pull-md-5 {\n    right: 41.66667%; }\n  .pull-md-6 {\n    right: 50%; }\n  .pull-md-7 {\n    right: 58.33333%; }\n  .pull-md-8 {\n    right: 66.66667%; }\n  .pull-md-9 {\n    right: 75%; }\n  .pull-md-10 {\n    right: 83.33333%; }\n  .pull-md-11 {\n    right: 91.66667%; }\n  .pull-md-12 {\n    right: 100%; }\n  .push-md-0 {\n    left: auto; }\n  .push-md-1 {\n    left: 8.33333%; }\n  .push-md-2 {\n    left: 16.66667%; }\n  .push-md-3 {\n    left: 25%; }\n  .push-md-4 {\n    left: 33.33333%; }\n  .push-md-5 {\n    left: 41.66667%; }\n  .push-md-6 {\n    left: 50%; }\n  .push-md-7 {\n    left: 58.33333%; }\n  .push-md-8 {\n    left: 66.66667%; }\n  .push-md-9 {\n    left: 75%; }\n  .push-md-10 {\n    left: 83.33333%; }\n  .push-md-11 {\n    left: 91.66667%; }\n  .push-md-12 {\n    left: 100%; }\n  .offset-md-0 {\n    margin-left: 0%; }\n  .offset-md-1 {\n    margin-left: 8.33333%; }\n  .offset-md-2 {\n    margin-left: 16.66667%; }\n  .offset-md-3 {\n    margin-left: 25%; }\n  .offset-md-4 {\n    margin-left: 33.33333%; }\n  .offset-md-5 {\n    margin-left: 41.66667%; }\n  .offset-md-6 {\n    margin-left: 50%; }\n  .offset-md-7 {\n    margin-left: 58.33333%; }\n  .offset-md-8 {\n    margin-left: 66.66667%; }\n  .offset-md-9 {\n    margin-left: 75%; }\n  .offset-md-10 {\n    margin-left: 83.33333%; }\n  .offset-md-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 992px) {\n  .col-lg {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-lg-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-lg-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333%;\n            flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-lg-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66667%;\n            flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-lg-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-lg-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333%;\n            flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-lg-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66667%;\n            flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-lg-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-lg-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333%;\n            flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-lg-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66667%;\n            flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-lg-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-lg-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333%;\n            flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-lg-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66667%;\n            flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-lg-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-lg-0 {\n    right: auto; }\n  .pull-lg-1 {\n    right: 8.33333%; }\n  .pull-lg-2 {\n    right: 16.66667%; }\n  .pull-lg-3 {\n    right: 25%; }\n  .pull-lg-4 {\n    right: 33.33333%; }\n  .pull-lg-5 {\n    right: 41.66667%; }\n  .pull-lg-6 {\n    right: 50%; }\n  .pull-lg-7 {\n    right: 58.33333%; }\n  .pull-lg-8 {\n    right: 66.66667%; }\n  .pull-lg-9 {\n    right: 75%; }\n  .pull-lg-10 {\n    right: 83.33333%; }\n  .pull-lg-11 {\n    right: 91.66667%; }\n  .pull-lg-12 {\n    right: 100%; }\n  .push-lg-0 {\n    left: auto; }\n  .push-lg-1 {\n    left: 8.33333%; }\n  .push-lg-2 {\n    left: 16.66667%; }\n  .push-lg-3 {\n    left: 25%; }\n  .push-lg-4 {\n    left: 33.33333%; }\n  .push-lg-5 {\n    left: 41.66667%; }\n  .push-lg-6 {\n    left: 50%; }\n  .push-lg-7 {\n    left: 58.33333%; }\n  .push-lg-8 {\n    left: 66.66667%; }\n  .push-lg-9 {\n    left: 75%; }\n  .push-lg-10 {\n    left: 83.33333%; }\n  .push-lg-11 {\n    left: 91.66667%; }\n  .push-lg-12 {\n    left: 100%; }\n  .offset-lg-0 {\n    margin-left: 0%; }\n  .offset-lg-1 {\n    margin-left: 8.33333%; }\n  .offset-lg-2 {\n    margin-left: 16.66667%; }\n  .offset-lg-3 {\n    margin-left: 25%; }\n  .offset-lg-4 {\n    margin-left: 33.33333%; }\n  .offset-lg-5 {\n    margin-left: 41.66667%; }\n  .offset-lg-6 {\n    margin-left: 50%; }\n  .offset-lg-7 {\n    margin-left: 58.33333%; }\n  .offset-lg-8 {\n    margin-left: 66.66667%; }\n  .offset-lg-9 {\n    margin-left: 75%; }\n  .offset-lg-10 {\n    margin-left: 83.33333%; }\n  .offset-lg-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 1200px) {\n  .col-xl {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-xl-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-xl-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333%;\n            flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-xl-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66667%;\n            flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-xl-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-xl-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333%;\n            flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-xl-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66667%;\n            flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-xl-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-xl-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333%;\n            flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-xl-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66667%;\n            flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-xl-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-xl-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333%;\n            flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-xl-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66667%;\n            flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-xl-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-xl-0 {\n    right: auto; }\n  .pull-xl-1 {\n    right: 8.33333%; }\n  .pull-xl-2 {\n    right: 16.66667%; }\n  .pull-xl-3 {\n    right: 25%; }\n  .pull-xl-4 {\n    right: 33.33333%; }\n  .pull-xl-5 {\n    right: 41.66667%; }\n  .pull-xl-6 {\n    right: 50%; }\n  .pull-xl-7 {\n    right: 58.33333%; }\n  .pull-xl-8 {\n    right: 66.66667%; }\n  .pull-xl-9 {\n    right: 75%; }\n  .pull-xl-10 {\n    right: 83.33333%; }\n  .pull-xl-11 {\n    right: 91.66667%; }\n  .pull-xl-12 {\n    right: 100%; }\n  .push-xl-0 {\n    left: auto; }\n  .push-xl-1 {\n    left: 8.33333%; }\n  .push-xl-2 {\n    left: 16.66667%; }\n  .push-xl-3 {\n    left: 25%; }\n  .push-xl-4 {\n    left: 33.33333%; }\n  .push-xl-5 {\n    left: 41.66667%; }\n  .push-xl-6 {\n    left: 50%; }\n  .push-xl-7 {\n    left: 58.33333%; }\n  .push-xl-8 {\n    left: 66.66667%; }\n  .push-xl-9 {\n    left: 75%; }\n  .push-xl-10 {\n    left: 83.33333%; }\n  .push-xl-11 {\n    left: 91.66667%; }\n  .push-xl-12 {\n    left: 100%; }\n  .offset-xl-0 {\n    margin-left: 0%; }\n  .offset-xl-1 {\n    margin-left: 8.33333%; }\n  .offset-xl-2 {\n    margin-left: 16.66667%; }\n  .offset-xl-3 {\n    margin-left: 25%; }\n  .offset-xl-4 {\n    margin-left: 33.33333%; }\n  .offset-xl-5 {\n    margin-left: 41.66667%; }\n  .offset-xl-6 {\n    margin-left: 50%; }\n  .offset-xl-7 {\n    margin-left: 58.33333%; }\n  .offset-xl-8 {\n    margin-left: 66.66667%; }\n  .offset-xl-9 {\n    margin-left: 75%; }\n  .offset-xl-10 {\n    margin-left: 83.33333%; }\n  .offset-xl-11 {\n    margin-left: 91.66667%; } }\n\n.table, table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 1rem; }\n  .table th, table th,\n  .table td, table td {\n    padding: 0.75rem;\n    vertical-align: top;\n    border-top: 1px solid #eceeef; }\n  .table thead th, table thead th {\n    vertical-align: bottom;\n    border-bottom: 2px solid #eceeef; }\n  .table tbody + tbody, table tbody + tbody {\n    border-top: 2px solid #eceeef; }\n  .table .table, table .table, .table table, table table {\n    background-color: #fff; }\n\n.table-sm th, table th,\n.table-sm td, table td {\n  padding: 0.3rem; }\n\n.table-bordered {\n  border: 1px solid #eceeef; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #eceeef; }\n  .table-bordered thead th,\n  .table-bordered thead td {\n    border-bottom-width: 2px; }\n\n.table-striped tbody tr:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.05); }\n\n.table-hover tbody tr:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-active,\n.table-active > th,\n.table-active > td {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-hover .table-active:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n  .table-hover .table-active:hover > td,\n  .table-hover .table-active:hover > th {\n    background-color: rgba(0, 0, 0, 0.075); }\n\n.table-success,\n.table-success > th,\n.table-success > td {\n  background-color: #dff0d8; }\n\n.table-hover .table-success:hover {\n  background-color: #d0e9c6; }\n  .table-hover .table-success:hover > td,\n  .table-hover .table-success:hover > th {\n    background-color: #d0e9c6; }\n\n.table-info,\n.table-info > th,\n.table-info > td {\n  background-color: #d9edf7; }\n\n.table-hover .table-info:hover {\n  background-color: #c4e3f3; }\n  .table-hover .table-info:hover > td,\n  .table-hover .table-info:hover > th {\n    background-color: #c4e3f3; }\n\n.table-warning,\n.table-warning > th,\n.table-warning > td {\n  background-color: #fcf8e3; }\n\n.table-hover .table-warning:hover {\n  background-color: #faf2cc; }\n  .table-hover .table-warning:hover > td,\n  .table-hover .table-warning:hover > th {\n    background-color: #faf2cc; }\n\n.table-danger,\n.table-danger > th,\n.table-danger > td {\n  background-color: #f2dede; }\n\n.table-hover .table-danger:hover {\n  background-color: #ebcccc; }\n  .table-hover .table-danger:hover > td,\n  .table-hover .table-danger:hover > th {\n    background-color: #ebcccc; }\n\n.thead-inverse th {\n  color: #fff;\n  background-color: #292b2c; }\n\n.thead-default th {\n  color: #464a4c;\n  background-color: #eceeef; }\n\n.table-inverse {\n  color: #fff;\n  background-color: #292b2c; }\n  .table-inverse th,\n  .table-inverse td,\n  .table-inverse thead th {\n    border-color: #fff; }\n  .table-inverse.table-bordered {\n    border: 0; }\n\n.table-responsive {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  -ms-overflow-style: -ms-autohiding-scrollbar; }\n  .table-responsive.table-bordered {\n    border: 0; }\n\n.form-control, input, textarea, select {\n  display: block;\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.25;\n  color: #464a4c;\n  background-color: #fff;\n  background-image: none;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; }\n  .form-control::-ms-expand, input::-ms-expand, textarea::-ms-expand, select::-ms-expand {\n    background-color: transparent;\n    border: 0; }\n  .form-control:focus, input:focus, textarea:focus, select:focus {\n    color: #464a4c;\n    background-color: #fff;\n    border-color: #5cb3fd;\n    outline: none; }\n  .form-control::-webkit-input-placeholder, input::-webkit-input-placeholder, textarea::-webkit-input-placeholder, select::-webkit-input-placeholder {\n    color: #636c72;\n    opacity: 1; }\n  .form-control:-ms-input-placeholder, input:-ms-input-placeholder, textarea:-ms-input-placeholder, select:-ms-input-placeholder {\n    color: #636c72;\n    opacity: 1; }\n  .form-control::placeholder, input::placeholder, textarea::placeholder, select::placeholder {\n    color: #636c72;\n    opacity: 1; }\n  .form-control:disabled, input:disabled, textarea:disabled, select:disabled, .form-control[readonly], input[readonly], textarea[readonly], select[readonly] {\n    background-color: #eceeef;\n    opacity: 1; }\n  .form-control:disabled, input:disabled, textarea:disabled, select:disabled {\n    cursor: not-allowed; }\n\nselect.form-control:not([size]):not([multiple]), select:not([size]):not([multiple]) {\n  height: calc(2.25rem + 2px); }\n\nselect.form-control:focus::-ms-value, select:focus::-ms-value {\n  color: #464a4c;\n  background-color: #fff; }\n\n.form-control-file,\n.form-control-range {\n  display: block; }\n\n.col-form-label {\n  padding-top: calc(0.5rem - 1px * 2);\n  padding-bottom: calc(0.5rem - 1px * 2);\n  margin-bottom: 0; }\n\n.col-form-label-lg {\n  padding-top: calc(0.75rem - 1px * 2);\n  padding-bottom: calc(0.75rem - 1px * 2);\n  font-size: 1.25rem; }\n\n.col-form-label-sm {\n  padding-top: calc(0.25rem - 1px * 2);\n  padding-bottom: calc(0.25rem - 1px * 2);\n  font-size: 0.875rem; }\n\n.col-form-legend {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  font-size: 1rem; }\n\n.form-control-static {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  line-height: 1.25;\n  border: solid transparent;\n  border-width: 1px 0; }\n  .form-control-static.form-control-sm, .input-group-sm > .form-control-static.form-control, .input-group-sm > input.form-control-static, .input-group-sm > textarea.form-control-static, .input-group-sm > select.form-control-static,\n  .input-group-sm > .form-control-static.input-group-addon,\n  .input-group-sm > .input-group-btn > .form-control-static.btn,\n  .input-group-sm > .input-group-btn > button.form-control-static, input.form-control-static, textarea.form-control-static, select.form-control-static, .form-control-static.form-control-lg, .input-group-lg > .form-control-static.form-control, .input-group-lg > input.form-control-static, .input-group-lg > textarea.form-control-static, .input-group-lg > select.form-control-static,\n  .input-group-lg > .form-control-static.input-group-addon,\n  .input-group-lg > .input-group-btn > .form-control-static.btn,\n  .input-group-lg > .input-group-btn > button.form-control-static {\n    padding-right: 0;\n    padding-left: 0; }\n\n.form-control-sm, .input-group-sm > .form-control, .input-group-sm > input, .input-group-sm > textarea, .input-group-sm > select,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn,\n.input-group-sm > .input-group-btn > button, input, textarea, select {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\nselect.form-control-sm:not([size]):not([multiple]),\n.input-group-sm > .input-group-btn > select.btn:not([size]):not([multiple]), select:not([size]):not([multiple]) {\n  height: 1.8125rem; }\n\n.form-control-lg, .input-group-lg > .form-control, .input-group-lg > input, .input-group-lg > textarea, .input-group-lg > select,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn,\n.input-group-lg > .input-group-btn > button {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\nselect.form-control-lg:not([size]):not([multiple]), .input-group-lg > select:not([size]):not([multiple]),\n.input-group-lg > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 3.16667rem; }\n\n.form-group {\n  margin-bottom: 1rem; }\n\n.form-text {\n  display: block;\n  margin-top: 0.25rem; }\n\n.form-check {\n  position: relative;\n  display: block;\n  margin-bottom: 0.5rem; }\n  .form-check.disabled .form-check-label {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.form-check-label {\n  padding-left: 1.25rem;\n  margin-bottom: 0;\n  cursor: pointer; }\n\n.form-check-input {\n  position: absolute;\n  margin-top: 0.25rem;\n  margin-left: -1.25rem; }\n  .form-check-input:only-child {\n    position: static; }\n\n.form-check-inline {\n  display: inline-block; }\n  .form-check-inline .form-check-label {\n    vertical-align: middle; }\n  .form-check-inline + .form-check-inline {\n    margin-left: 0.75rem; }\n\n.form-control-feedback {\n  margin-top: 0.25rem; }\n\n.form-control-success,\n.form-control-warning,\n.form-control-danger {\n  padding-right: 2.25rem;\n  background-repeat: no-repeat;\n  background-position: center right 0.5625rem;\n  background-size: 1.125rem 1.125rem; }\n\n.has-success .form-control-feedback,\n.has-success .form-control-label,\n.has-success .col-form-label,\n.has-success .form-check-label,\n.has-success .custom-control {\n  color: #5cb85c; }\n\n.has-success .form-control, .has-success input, .has-success textarea, .has-success select {\n  border-color: #5cb85c; }\n\n.has-success .input-group-addon {\n  color: #5cb85c;\n  border-color: #5cb85c;\n  background-color: #eaf6ea; }\n\n.has-success .form-control-success {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%235cb85c' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\"); }\n\n.has-warning .form-control-feedback,\n.has-warning .form-control-label,\n.has-warning .col-form-label,\n.has-warning .form-check-label,\n.has-warning .custom-control {\n  color: #f0ad4e; }\n\n.has-warning .form-control, .has-warning input, .has-warning textarea, .has-warning select {\n  border-color: #f0ad4e; }\n\n.has-warning .input-group-addon {\n  color: #f0ad4e;\n  border-color: #f0ad4e;\n  background-color: white; }\n\n.has-warning .form-control-warning {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23f0ad4e' d='M4.4 5.324h-.8v-2.46h.8zm0 1.42h-.8V5.89h.8zM3.76.63L.04 7.075c-.115.2.016.425.26.426h7.397c.242 0 .372-.226.258-.426C6.726 4.924 5.47 2.79 4.253.63c-.113-.174-.39-.174-.494 0z'/%3E%3C/svg%3E\"); }\n\n.has-danger .form-control-feedback,\n.has-danger .form-control-label,\n.has-danger .col-form-label,\n.has-danger .form-check-label,\n.has-danger .custom-control {\n  color: #d9534f; }\n\n.has-danger .form-control, .has-danger input, .has-danger textarea, .has-danger select {\n  border-color: #d9534f; }\n\n.has-danger .input-group-addon {\n  color: #d9534f;\n  border-color: #d9534f;\n  background-color: #fdf7f7; }\n\n.has-danger .form-control-danger {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23d9534f' viewBox='-2 -2 7 7'%3E%3Cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3E%3Ccircle r='.5'/%3E%3Ccircle cx='3' r='.5'/%3E%3Ccircle cy='3' r='.5'/%3E%3Ccircle cx='3' cy='3' r='.5'/%3E%3C/svg%3E\"); }\n\n.form-inline {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .form-inline .form-check {\n    width: 100%; }\n  @media (min-width: 576px) {\n    .form-inline label {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      margin-bottom: 0; }\n    .form-inline .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-flex: 0;\n          -ms-flex: 0 0 auto;\n              flex: 0 0 auto;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-flow: row wrap;\n              flex-flow: row wrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 0; }\n    .form-inline .form-control, .form-inline input, .form-inline textarea, .form-inline select {\n      display: inline-block;\n      width: auto;\n      vertical-align: middle; }\n    .form-inline .form-control-static {\n      display: inline-block; }\n    .form-inline .input-group {\n      width: auto; }\n    .form-inline .form-control-label {\n      margin-bottom: 0;\n      vertical-align: middle; }\n    .form-inline .form-check {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      width: auto;\n      margin-top: 0;\n      margin-bottom: 0; }\n    .form-inline .form-check-label {\n      padding-left: 0; }\n    .form-inline .form-check-input {\n      position: relative;\n      margin-top: 0;\n      margin-right: 0.25rem;\n      margin-left: 0; }\n    .form-inline .custom-control {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      padding-left: 0; }\n    .form-inline .custom-control-indicator {\n      position: static;\n      display: inline-block;\n      margin-right: 0.25rem;\n      vertical-align: text-bottom; }\n    .form-inline .has-feedback .form-control-feedback {\n      top: 0; } }\n\n.btn, button {\n  display: inline-block;\n  font-weight: normal;\n  line-height: 1.25;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  border: 1px solid transparent;\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n  border-radius: 0.25rem;\n  transition: all 0.2s ease-in-out; }\n  .btn:focus, button:focus, .btn:hover, button:hover {\n    text-decoration: none; }\n  .btn:focus, button:focus, .btn.focus, button.focus {\n    outline: 0;\n    box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25); }\n  .btn.disabled, button.disabled, .btn:disabled, button:disabled {\n    cursor: not-allowed;\n    opacity: .65; }\n  .btn:active, button:active, .btn.active, button.active {\n    background-image: none; }\n\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8; }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #025aa5;\n    border-color: #01549b; }\n  .btn-primary:focus, .btn-primary.focus {\n    box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5); }\n  .btn-primary.disabled, .btn-primary:disabled {\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-primary:active, .btn-primary.active,\n  .show > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #025aa5;\n    background-image: none;\n    border-color: #01549b; }\n\n.btn-secondary {\n  color: #292b2c;\n  background-color: #fff;\n  border-color: #ccc; }\n  .btn-secondary:hover {\n    color: #292b2c;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n  .btn-secondary:focus, .btn-secondary.focus {\n    box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5); }\n  .btn-secondary.disabled, .btn-secondary:disabled {\n    background-color: #fff;\n    border-color: #ccc; }\n  .btn-secondary:active, .btn-secondary.active,\n  .show > .btn-secondary.dropdown-toggle {\n    color: #292b2c;\n    background-color: #e6e6e6;\n    background-image: none;\n    border-color: #adadad; }\n\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #5bc0de; }\n  .btn-info:hover {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #2aabd2; }\n  .btn-info:focus, .btn-info.focus {\n    box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5); }\n  .btn-info.disabled, .btn-info:disabled {\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-info:active, .btn-info.active,\n  .show > .btn-info.dropdown-toggle {\n    color: #fff;\n    background-color: #31b0d5;\n    background-image: none;\n    border-color: #2aabd2; }\n\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #5cb85c; }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #419641; }\n  .btn-success:focus, .btn-success.focus {\n    box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5); }\n  .btn-success.disabled, .btn-success:disabled {\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-success:active, .btn-success.active,\n  .show > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #449d44;\n    background-image: none;\n    border-color: #419641; }\n\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #f0ad4e; }\n  .btn-warning:hover {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #eb9316; }\n  .btn-warning:focus, .btn-warning.focus {\n    box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5); }\n  .btn-warning.disabled, .btn-warning:disabled {\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-warning:active, .btn-warning.active,\n  .show > .btn-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #ec971f;\n    background-image: none;\n    border-color: #eb9316; }\n\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d9534f; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #c12e2a; }\n  .btn-danger:focus, .btn-danger.focus {\n    box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5); }\n  .btn-danger.disabled, .btn-danger:disabled {\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-danger:active, .btn-danger.active,\n  .show > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #c9302c;\n    background-image: none;\n    border-color: #c12e2a; }\n\n.btn-outline-primary {\n  color: #0275d8;\n  background-image: none;\n  background-color: transparent;\n  border-color: #0275d8; }\n  .btn-outline-primary:hover {\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-outline-primary:focus, .btn-outline-primary.focus {\n    box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5); }\n  .btn-outline-primary.disabled, .btn-outline-primary:disabled {\n    color: #0275d8;\n    background-color: transparent; }\n  .btn-outline-primary:active, .btn-outline-primary.active,\n  .show > .btn-outline-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n\n.btn-outline-secondary {\n  color: #ccc;\n  background-image: none;\n  background-color: transparent;\n  border-color: #ccc; }\n  .btn-outline-secondary:hover {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n  .btn-outline-secondary:focus, .btn-outline-secondary.focus {\n    box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5); }\n  .btn-outline-secondary.disabled, .btn-outline-secondary:disabled {\n    color: #ccc;\n    background-color: transparent; }\n  .btn-outline-secondary:active, .btn-outline-secondary.active,\n  .show > .btn-outline-secondary.dropdown-toggle {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n\n.btn-outline-info {\n  color: #5bc0de;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5bc0de; }\n  .btn-outline-info:hover {\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-outline-info:focus, .btn-outline-info.focus {\n    box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5); }\n  .btn-outline-info.disabled, .btn-outline-info:disabled {\n    color: #5bc0de;\n    background-color: transparent; }\n  .btn-outline-info:active, .btn-outline-info.active,\n  .show > .btn-outline-info.dropdown-toggle {\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n\n.btn-outline-success {\n  color: #5cb85c;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5cb85c; }\n  .btn-outline-success:hover {\n    color: #fff;\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-outline-success:focus, .btn-outline-success.focus {\n    box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5); }\n  .btn-outline-success.disabled, .btn-outline-success:disabled {\n    color: #5cb85c;\n    background-color: transparent; }\n  .btn-outline-success:active, .btn-outline-success.active,\n  .show > .btn-outline-success.dropdown-toggle {\n    color: #fff;\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n\n.btn-outline-warning {\n  color: #f0ad4e;\n  background-image: none;\n  background-color: transparent;\n  border-color: #f0ad4e; }\n  .btn-outline-warning:hover {\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-outline-warning:focus, .btn-outline-warning.focus {\n    box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5); }\n  .btn-outline-warning.disabled, .btn-outline-warning:disabled {\n    color: #f0ad4e;\n    background-color: transparent; }\n  .btn-outline-warning:active, .btn-outline-warning.active,\n  .show > .btn-outline-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n\n.btn-outline-danger {\n  color: #d9534f;\n  background-image: none;\n  background-color: transparent;\n  border-color: #d9534f; }\n  .btn-outline-danger:hover {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-outline-danger:focus, .btn-outline-danger.focus {\n    box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5); }\n  .btn-outline-danger.disabled, .btn-outline-danger:disabled {\n    color: #d9534f;\n    background-color: transparent; }\n  .btn-outline-danger:active, .btn-outline-danger.active,\n  .show > .btn-outline-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f; }\n\n.btn-link {\n  font-weight: normal;\n  color: #0275d8;\n  border-radius: 0; }\n  .btn-link, .btn-link:active, .btn-link.active, .btn-link:disabled {\n    background-color: transparent; }\n  .btn-link, .btn-link:focus, .btn-link:active {\n    border-color: transparent; }\n  .btn-link:hover {\n    border-color: transparent; }\n  .btn-link:focus, .btn-link:hover {\n    color: #014c8c;\n    text-decoration: underline;\n    background-color: transparent; }\n  .btn-link:disabled {\n    color: #636c72; }\n    .btn-link:disabled:focus, .btn-link:disabled:hover {\n      text-decoration: none; }\n\n.btn-lg, .btn-group-lg > .btn, .btn-group-lg > button {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\n.btn-sm, .btn-group-sm > .btn, .btn-group-sm > button, button {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\n.btn-block {\n  display: block;\n  width: 100%; }\n\n.btn-block + .btn-block {\n  margin-top: 0.5rem; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.fade {\n  opacity: 0;\n  transition: opacity 0.15s linear; }\n  .fade.show {\n    opacity: 1; }\n\n.collapse {\n  display: none; }\n  .collapse.show {\n    display: block; }\n\ntr.collapse.show {\n  display: table-row; }\n\ntbody.collapse.show {\n  display: table-row-group; }\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  transition: height 0.35s ease; }\n\n.dropup,\n.dropdown {\n  position: relative; }\n\n.dropdown-toggle::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.3em;\n  vertical-align: middle;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-left: 0.3em solid transparent; }\n\n.dropdown-toggle:focus {\n  outline: 0; }\n\n.dropup .dropdown-toggle::after {\n  border-top: 0;\n  border-bottom: 0.3em solid; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #292b2c;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n\n.dropdown-divider {\n  height: 1px;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  background-color: #eceeef; }\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 3px 1.5rem;\n  clear: both;\n  font-weight: normal;\n  color: #292b2c;\n  text-align: inherit;\n  white-space: nowrap;\n  background: none;\n  border: 0; }\n  .dropdown-item:focus, .dropdown-item:hover {\n    color: #1d1e1f;\n    text-decoration: none;\n    background-color: #f7f7f9; }\n  .dropdown-item.active, .dropdown-item:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #0275d8; }\n  .dropdown-item.disabled, .dropdown-item:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: transparent; }\n\n.show > .dropdown-menu {\n  display: block; }\n\n.show > a {\n  outline: 0; }\n\n.dropdown-menu-right {\n  right: 0;\n  left: auto; }\n\n.dropdown-menu-left {\n  right: auto;\n  left: 0; }\n\n.dropdown-header {\n  display: block;\n  padding: 0.5rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #636c72;\n  white-space: nowrap; }\n\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 990; }\n\n.dropup .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 0.125rem; }\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  vertical-align: middle; }\n  .btn-group > .btn, .btn-group > button,\n  .btn-group-vertical > .btn,\n  .btn-group-vertical > button {\n    position: relative;\n    -webkit-box-flex: 0;\n        -ms-flex: 0 1 auto;\n            flex: 0 1 auto; }\n    .btn-group > .btn:hover, .btn-group > button:hover,\n    .btn-group-vertical > .btn:hover,\n    .btn-group-vertical > button:hover {\n      z-index: 2; }\n    .btn-group > .btn:focus, .btn-group > button:focus, .btn-group > .btn:active, .btn-group > button:active, .btn-group > .btn.active, .btn-group > button.active,\n    .btn-group-vertical > .btn:focus,\n    .btn-group-vertical > button:focus,\n    .btn-group-vertical > .btn:active,\n    .btn-group-vertical > button:active,\n    .btn-group-vertical > .btn.active,\n    .btn-group-vertical > button.active {\n      z-index: 2; }\n  .btn-group .btn + .btn, .btn-group button + .btn, .btn-group .btn + button, .btn-group button + button,\n  .btn-group .btn + .btn-group,\n  .btn-group button + .btn-group,\n  .btn-group .btn-group + .btn,\n  .btn-group .btn-group + button,\n  .btn-group .btn-group + .btn-group,\n  .btn-group-vertical .btn + .btn,\n  .btn-group-vertical button + .btn,\n  .btn-group-vertical .btn + button,\n  .btn-group-vertical button + button,\n  .btn-group-vertical .btn + .btn-group,\n  .btn-group-vertical button + .btn-group,\n  .btn-group-vertical .btn-group + .btn,\n  .btn-group-vertical .btn-group + button,\n  .btn-group-vertical .btn-group + .btn-group {\n    margin-left: -1px; }\n\n.btn-toolbar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start; }\n  .btn-toolbar .input-group {\n    width: auto; }\n\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle), .btn-group > button:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0; }\n\n.btn-group > .btn:first-child, .btn-group > button:first-child {\n  margin-left: 0; }\n  .btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle), .btn-group > button:first-child:not(:last-child):not(.dropdown-toggle) {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0; }\n\n.btn-group > .btn:last-child:not(:first-child), .btn-group > button:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group > .btn-group {\n  float: left; }\n\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn, .btn-group > .btn-group:not(:first-child):not(:last-child) > button {\n  border-radius: 0; }\n\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child, .btn-group > .btn-group:first-child:not(:last-child) > button:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child, .btn-group > .btn-group:last-child:not(:first-child) > button:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0; }\n\n.btn + .dropdown-toggle-split, button + .dropdown-toggle-split {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem; }\n  .btn + .dropdown-toggle-split::after, button + .dropdown-toggle-split::after {\n    margin-left: 0; }\n\n.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split, .btn-group-sm > button + .dropdown-toggle-split, button + .dropdown-toggle-split {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem; }\n\n.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split, .btn-group-lg > button + .dropdown-toggle-split {\n  padding-right: 1.125rem;\n  padding-left: 1.125rem; }\n\n.btn-group-vertical {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  .btn-group-vertical .btn, .btn-group-vertical button,\n  .btn-group-vertical .btn-group {\n    width: 100%; }\n  .btn-group-vertical > .btn + .btn, .btn-group-vertical > button + .btn, .btn-group-vertical > .btn + button, .btn-group-vertical > button + button,\n  .btn-group-vertical > .btn + .btn-group,\n  .btn-group-vertical > button + .btn-group,\n  .btn-group-vertical > .btn-group + .btn,\n  .btn-group-vertical > .btn-group + button,\n  .btn-group-vertical > .btn-group + .btn-group {\n    margin-top: -1px;\n    margin-left: 0; }\n\n.btn-group-vertical > .btn:not(:first-child):not(:last-child), .btn-group-vertical > button:not(:first-child):not(:last-child) {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn:first-child:not(:last-child), .btn-group-vertical > button:first-child:not(:last-child) {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn:last-child:not(:first-child), .btn-group-vertical > button:last-child:not(:first-child) {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn, .btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > button {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child, .btn-group-vertical > .btn-group:first-child:not(:last-child) > button:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child, .btn-group-vertical > .btn-group:last-child:not(:first-child) > button:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"], [data-toggle=\"buttons\"] > button input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > button input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > button input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > button input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none; }\n\n.input-group {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%; }\n  .input-group .form-control, .input-group input, .input-group textarea, .input-group select {\n    position: relative;\n    z-index: 2;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    width: 1%;\n    margin-bottom: 0; }\n    .input-group .form-control:focus, .input-group input:focus, .input-group textarea:focus, .input-group select:focus, .input-group .form-control:active, .input-group input:active, .input-group textarea:active, .input-group select:active, .input-group .form-control:hover, .input-group input:hover, .input-group textarea:hover, .input-group select:hover {\n      z-index: 3; }\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control,\n.input-group input,\n.input-group textarea,\n.input-group select {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  .input-group-addon:not(:first-child):not(:last-child),\n  .input-group-btn:not(:first-child):not(:last-child),\n  .input-group .form-control:not(:first-child):not(:last-child),\n  .input-group input:not(:first-child):not(:last-child),\n  .input-group textarea:not(:first-child):not(:last-child),\n  .input-group select:not(:first-child):not(:last-child) {\n    border-radius: 0; }\n\n.input-group-addon,\n.input-group-btn {\n  white-space: nowrap;\n  vertical-align: middle; }\n\n.input-group-addon {\n  padding: 0.5rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.25;\n  color: #464a4c;\n  text-align: center;\n  background-color: #eceeef;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n  .input-group-addon.form-control-sm,\n  .input-group-sm > .input-group-addon,\n  .input-group-sm > .input-group-btn > .input-group-addon.btn,\n  .input-group-sm > .input-group-btn > button.input-group-addon, input.input-group-addon, textarea.input-group-addon, select.input-group-addon {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.875rem;\n    border-radius: 0.2rem; }\n  .input-group-addon.form-control-lg,\n  .input-group-lg > .input-group-addon,\n  .input-group-lg > .input-group-btn > .input-group-addon.btn,\n  .input-group-lg > .input-group-btn > button.input-group-addon {\n    padding: 0.75rem 1.5rem;\n    font-size: 1.25rem;\n    border-radius: 0.3rem; }\n  .input-group-addon input[type=\"radio\"],\n  .input-group-addon input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.input-group .form-control:not(:last-child), .input-group input:not(:last-child), .input-group textarea:not(:last-child), .input-group select:not(:last-child),\n.input-group-addon:not(:last-child),\n.input-group-btn:not(:last-child) > .btn,\n.input-group-btn:not(:last-child) > button,\n.input-group-btn:not(:last-child) > .btn-group > .btn,\n.input-group-btn:not(:last-child) > .btn-group > button,\n.input-group-btn:not(:last-child) > .dropdown-toggle,\n.input-group-btn:not(:first-child) > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:not(:first-child) > button:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:not(:first-child) > .btn-group:not(:last-child) > .btn,\n.input-group-btn:not(:first-child) > .btn-group:not(:last-child) > button {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.input-group-addon:not(:last-child) {\n  border-right: 0; }\n\n.input-group .form-control:not(:first-child), .input-group input:not(:first-child), .input-group textarea:not(:first-child), .input-group select:not(:first-child),\n.input-group-addon:not(:first-child),\n.input-group-btn:not(:first-child) > .btn,\n.input-group-btn:not(:first-child) > button,\n.input-group-btn:not(:first-child) > .btn-group > .btn,\n.input-group-btn:not(:first-child) > .btn-group > button,\n.input-group-btn:not(:first-child) > .dropdown-toggle,\n.input-group-btn:not(:last-child) > .btn:not(:first-child),\n.input-group-btn:not(:last-child) > button:not(:first-child),\n.input-group-btn:not(:last-child) > .btn-group:not(:first-child) > .btn,\n.input-group-btn:not(:last-child) > .btn-group:not(:first-child) > button {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.form-control + .input-group-addon:not(:first-child), input + .input-group-addon:not(:first-child), textarea + .input-group-addon:not(:first-child), select + .input-group-addon:not(:first-child) {\n  border-left: 0; }\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap; }\n  .input-group-btn > .btn, .input-group-btn > button {\n    position: relative;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1; }\n    .input-group-btn > .btn + .btn, .input-group-btn > button + .btn, .input-group-btn > .btn + button, .input-group-btn > button + button {\n      margin-left: -1px; }\n    .input-group-btn > .btn:focus, .input-group-btn > button:focus, .input-group-btn > .btn:active, .input-group-btn > button:active, .input-group-btn > .btn:hover, .input-group-btn > button:hover {\n      z-index: 3; }\n  .input-group-btn:not(:last-child) > .btn, .input-group-btn:not(:last-child) > button,\n  .input-group-btn:not(:last-child) > .btn-group {\n    margin-right: -1px; }\n  .input-group-btn:not(:first-child) > .btn, .input-group-btn:not(:first-child) > button,\n  .input-group-btn:not(:first-child) > .btn-group {\n    z-index: 2;\n    margin-left: -1px; }\n    .input-group-btn:not(:first-child) > .btn:focus, .input-group-btn:not(:first-child) > button:focus, .input-group-btn:not(:first-child) > .btn:active, .input-group-btn:not(:first-child) > button:active, .input-group-btn:not(:first-child) > .btn:hover, .input-group-btn:not(:first-child) > button:hover,\n    .input-group-btn:not(:first-child) > .btn-group:focus,\n    .input-group-btn:not(:first-child) > .btn-group:active,\n    .input-group-btn:not(:first-child) > .btn-group:hover {\n      z-index: 3; }\n\n.custom-control {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  min-height: 1.5rem;\n  padding-left: 1.5rem;\n  margin-right: 1rem;\n  cursor: pointer; }\n\n.custom-control-input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0; }\n  .custom-control-input:checked ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #0275d8; }\n  .custom-control-input:focus ~ .custom-control-indicator {\n    box-shadow: 0 0 0 1px #fff, 0 0 0 3px #0275d8; }\n  .custom-control-input:active ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #8fcafe; }\n  .custom-control-input:disabled ~ .custom-control-indicator {\n    cursor: not-allowed;\n    background-color: #eceeef; }\n  .custom-control-input:disabled ~ .custom-control-description {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.custom-control-indicator {\n  position: absolute;\n  top: 0.25rem;\n  left: 0;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: #ddd;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: 50% 50%; }\n\n.custom-checkbox .custom-control-indicator {\n  border-radius: 0.25rem; }\n\n.custom-checkbox .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E\"); }\n\n.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-indicator {\n  background-color: #0275d8;\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='%23fff' d='M0 2h4'/%3E%3C/svg%3E\"); }\n\n.custom-radio .custom-control-indicator {\n  border-radius: 50%; }\n\n.custom-radio .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E\"); }\n\n.custom-controls-stacked {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n  .custom-controls-stacked .custom-control {\n    margin-bottom: 0.25rem; }\n    .custom-controls-stacked .custom-control + .custom-control {\n      margin-left: 0; }\n\n.custom-select {\n  display: inline-block;\n  max-width: 100%;\n  height: calc(2.25rem + 2px);\n  padding: 0.375rem 1.75rem 0.375rem 0.75rem;\n  line-height: 1.25;\n  color: #464a4c;\n  vertical-align: middle;\n  background: #fff url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23333' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\") no-repeat right 0.75rem center;\n  background-size: 8px 10px;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  -moz-appearance: none;\n  -webkit-appearance: none; }\n  .custom-select:focus {\n    border-color: #5cb3fd;\n    outline: none; }\n    .custom-select:focus::-ms-value {\n      color: #464a4c;\n      background-color: #fff; }\n  .custom-select:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: #eceeef; }\n  .custom-select::-ms-expand {\n    opacity: 0; }\n\n.custom-select-sm {\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  font-size: 75%; }\n\n.custom-file {\n  position: relative;\n  display: inline-block;\n  max-width: 100%;\n  height: 2.5rem;\n  margin-bottom: 0;\n  cursor: pointer; }\n\n.custom-file-input {\n  min-width: 14rem;\n  max-width: 100%;\n  height: 2.5rem;\n  margin: 0;\n  filter: alpha(opacity=0);\n  opacity: 0; }\n\n.custom-file-control {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 5;\n  height: 2.5rem;\n  padding: 0.5rem 1rem;\n  line-height: 1.5;\n  color: #464a4c;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n  .custom-file-control:lang(en)::after {\n    content: \"Choose file...\"; }\n  .custom-file-control::before {\n    position: absolute;\n    top: -1px;\n    right: -1px;\n    bottom: -1px;\n    z-index: 6;\n    display: block;\n    height: 2.5rem;\n    padding: 0.5rem 1rem;\n    line-height: 1.5;\n    color: #464a4c;\n    background-color: #eceeef;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-radius: 0 0.25rem 0.25rem 0; }\n  .custom-file-control:lang(en)::before {\n    content: \"Browse\"; }\n\n.nav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n\n.nav-link {\n  display: block;\n  padding: 0.5em 1em; }\n  .nav-link:focus, .nav-link:hover {\n    text-decoration: none; }\n  .nav-link.disabled {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd; }\n  .nav-tabs .nav-item {\n    margin-bottom: -1px; }\n  .nav-tabs .nav-link {\n    border: 1px solid transparent;\n    border-top-right-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n    .nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {\n      border-color: #eceeef #eceeef #ddd; }\n    .nav-tabs .nav-link.disabled {\n      color: #636c72;\n      background-color: transparent;\n      border-color: transparent; }\n  .nav-tabs .nav-link.active,\n  .nav-tabs .nav-item.show .nav-link {\n    color: #464a4c;\n    background-color: #fff;\n    border-color: #ddd #ddd #fff; }\n  .nav-tabs .dropdown-menu {\n    margin-top: -1px;\n    border-top-right-radius: 0;\n    border-top-left-radius: 0; }\n\n.nav-pills .nav-link {\n  border-radius: 0.25rem; }\n\n.nav-pills .nav-link.active,\n.nav-pills .nav-item.show .nav-link {\n  color: #fff;\n  cursor: default;\n  background-color: #0275d8; }\n\n.nav-fill .nav-item {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  text-align: center; }\n\n.nav-justified .nav-item {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 100%;\n          flex: 1 1 100%;\n  text-align: center; }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.navbar {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 0.5rem 1rem; }\n\n.navbar-brand {\n  display: inline-block;\n  padding-top: .25rem;\n  padding-bottom: .25rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  line-height: inherit;\n  white-space: nowrap; }\n  .navbar-brand:focus, .navbar-brand:hover {\n    text-decoration: none; }\n\n.navbar-nav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n  .navbar-nav .nav-link {\n    padding-right: 0;\n    padding-left: 0; }\n\n.navbar-text {\n  display: inline-block;\n  padding-top: .425rem;\n  padding-bottom: .425rem; }\n\n.navbar-toggler {\n  -ms-flex-item-align: start;\n      align-self: flex-start;\n  padding: 0.25rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n  .navbar-toggler:focus, .navbar-toggler:hover {\n    text-decoration: none; }\n\n.navbar-toggler-icon {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  content: \"\";\n  background: no-repeat center center;\n  background-size: 100% 100%; }\n\n.navbar-toggler-left {\n  position: absolute;\n  left: 1rem; }\n\n.navbar-toggler-right {\n  position: absolute;\n  right: 1rem; }\n\n@media (max-width: 575px) {\n  .navbar-toggleable .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 576px) {\n  .navbar-toggleable {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 767px) {\n  .navbar-toggleable-sm .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-sm > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 768px) {\n  .navbar-toggleable-sm {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable-sm .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable-sm .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-sm > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable-sm .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-sm .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 991px) {\n  .navbar-toggleable-md .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-md > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 992px) {\n  .navbar-toggleable-md {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable-md .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable-md .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-md > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable-md .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-md .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 1199px) {\n  .navbar-toggleable-lg .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-lg > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 1200px) {\n  .navbar-toggleable-lg {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable-lg .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable-lg .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-lg > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable-lg .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-lg .navbar-toggler {\n      display: none; } }\n\n.navbar-toggleable-xl {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .navbar-toggleable-xl .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-xl > .container {\n    padding-right: 0;\n    padding-left: 0; }\n  .navbar-toggleable-xl .navbar-nav {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n    .navbar-toggleable-xl .navbar-nav .nav-link {\n      padding-right: .5rem;\n      padding-left: .5rem; }\n  .navbar-toggleable-xl > .container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .navbar-toggleable-xl .navbar-collapse {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    width: 100%; }\n  .navbar-toggleable-xl .navbar-toggler {\n    display: none; }\n\n.navbar-light .navbar-brand,\n.navbar-light .navbar-toggler {\n  color: rgba(0, 0, 0, 0.9); }\n  .navbar-light .navbar-brand:focus, .navbar-light .navbar-brand:hover,\n  .navbar-light .navbar-toggler:focus,\n  .navbar-light .navbar-toggler:hover {\n    color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.5); }\n  .navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover {\n    color: rgba(0, 0, 0, 0.7); }\n  .navbar-light .navbar-nav .nav-link.disabled {\n    color: rgba(0, 0, 0, 0.3); }\n\n.navbar-light .navbar-nav .open > .nav-link,\n.navbar-light .navbar-nav .active > .nav-link,\n.navbar-light .navbar-nav .nav-link.open,\n.navbar-light .navbar-nav .nav-link.active {\n  color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-toggler {\n  border-color: rgba(0, 0, 0, 0.1); }\n\n.navbar-light .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\"); }\n\n.navbar-light .navbar-text {\n  color: rgba(0, 0, 0, 0.5); }\n\n.navbar-inverse .navbar-brand,\n.navbar-inverse .navbar-toggler {\n  color: white; }\n  .navbar-inverse .navbar-brand:focus, .navbar-inverse .navbar-brand:hover,\n  .navbar-inverse .navbar-toggler:focus,\n  .navbar-inverse .navbar-toggler:hover {\n    color: white; }\n\n.navbar-inverse .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.5); }\n  .navbar-inverse .navbar-nav .nav-link:focus, .navbar-inverse .navbar-nav .nav-link:hover {\n    color: rgba(255, 255, 255, 0.75); }\n  .navbar-inverse .navbar-nav .nav-link.disabled {\n    color: rgba(255, 255, 255, 0.25); }\n\n.navbar-inverse .navbar-nav .open > .nav-link,\n.navbar-inverse .navbar-nav .active > .nav-link,\n.navbar-inverse .navbar-nav .nav-link.open,\n.navbar-inverse .navbar-nav .nav-link.active {\n  color: white; }\n\n.navbar-inverse .navbar-toggler {\n  border-color: rgba(255, 255, 255, 0.1); }\n\n.navbar-inverse .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\"); }\n\n.navbar-inverse .navbar-text {\n  color: rgba(255, 255, 255, 0.5); }\n\n.card {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.25rem; }\n\n.card-block {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  padding: 1.25rem; }\n\n.card-title {\n  margin-bottom: 0.75rem; }\n\n.card-subtitle {\n  margin-top: -0.375rem;\n  margin-bottom: 0; }\n\n.card-text:last-child {\n  margin-bottom: 0; }\n\n.card-link:hover {\n  text-decoration: none; }\n\n.card-link + .card-link {\n  margin-left: 1.25rem; }\n\n.card > .list-group:first-child .list-group-item:first-child {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.card > .list-group:last-child .list-group-item:last-child {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.card-header {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #f7f7f9;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-header:first-child {\n    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0; }\n\n.card-footer {\n  padding: 0.75rem 1.25rem;\n  background-color: #f7f7f9;\n  border-top: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-footer:last-child {\n    border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px); }\n\n.card-header-tabs {\n  margin-right: -0.625rem;\n  margin-bottom: -0.75rem;\n  margin-left: -0.625rem;\n  border-bottom: 0; }\n\n.card-header-pills {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem; }\n\n.card-primary {\n  background-color: #0275d8;\n  border-color: #0275d8; }\n  .card-primary .card-header,\n  .card-primary .card-footer {\n    background-color: transparent; }\n\n.card-success {\n  background-color: #5cb85c;\n  border-color: #5cb85c; }\n  .card-success .card-header,\n  .card-success .card-footer {\n    background-color: transparent; }\n\n.card-info {\n  background-color: #5bc0de;\n  border-color: #5bc0de; }\n  .card-info .card-header,\n  .card-info .card-footer {\n    background-color: transparent; }\n\n.card-warning {\n  background-color: #f0ad4e;\n  border-color: #f0ad4e; }\n  .card-warning .card-header,\n  .card-warning .card-footer {\n    background-color: transparent; }\n\n.card-danger {\n  background-color: #d9534f;\n  border-color: #d9534f; }\n  .card-danger .card-header,\n  .card-danger .card-footer {\n    background-color: transparent; }\n\n.card-outline-primary {\n  background-color: transparent;\n  border-color: #0275d8; }\n\n.card-outline-secondary {\n  background-color: transparent;\n  border-color: #ccc; }\n\n.card-outline-info {\n  background-color: transparent;\n  border-color: #5bc0de; }\n\n.card-outline-success {\n  background-color: transparent;\n  border-color: #5cb85c; }\n\n.card-outline-warning {\n  background-color: transparent;\n  border-color: #f0ad4e; }\n\n.card-outline-danger {\n  background-color: transparent;\n  border-color: #d9534f; }\n\n.card-inverse {\n  color: rgba(255, 255, 255, 0.65); }\n  .card-inverse .card-header,\n  .card-inverse .card-footer {\n    background-color: transparent;\n    border-color: rgba(255, 255, 255, 0.2); }\n  .card-inverse .card-header,\n  .card-inverse .card-footer,\n  .card-inverse .card-title,\n  .card-inverse .card-blockquote {\n    color: #fff; }\n  .card-inverse .card-link,\n  .card-inverse .card-text,\n  .card-inverse .card-subtitle,\n  .card-inverse .card-blockquote .blockquote-footer {\n    color: rgba(255, 255, 255, 0.65); }\n  .card-inverse .card-link:focus, .card-inverse .card-link:hover {\n    color: #fff; }\n\n.card-blockquote {\n  padding: 0;\n  margin-bottom: 0;\n  border-left: 0; }\n\n.card-img {\n  border-radius: calc(0.25rem - 1px); }\n\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem; }\n\n.card-img-top {\n  border-top-right-radius: calc(0.25rem - 1px);\n  border-top-left-radius: calc(0.25rem - 1px); }\n\n.card-img-bottom {\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px); }\n\n@media (min-width: 576px) {\n  .card-deck {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap; }\n    .card-deck .card {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-flex: 1;\n          -ms-flex: 1 0 0px;\n              flex: 1 0 0;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column; }\n      .card-deck .card:not(:first-child) {\n        margin-left: 15px; }\n      .card-deck .card:not(:last-child) {\n        margin-right: 15px; } }\n\n@media (min-width: 576px) {\n  .card-group {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap; }\n    .card-group .card {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 0 0px;\n              flex: 1 0 0; }\n      .card-group .card + .card {\n        margin-left: 0;\n        border-left: 0; }\n      .card-group .card:first-child {\n        border-bottom-right-radius: 0;\n        border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-top {\n          border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-bottom {\n          border-bottom-right-radius: 0; }\n      .card-group .card:last-child {\n        border-bottom-left-radius: 0;\n        border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-top {\n          border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-bottom {\n          border-bottom-left-radius: 0; }\n      .card-group .card:not(:first-child):not(:last-child) {\n        border-radius: 0; }\n        .card-group .card:not(:first-child):not(:last-child) .card-img-top,\n        .card-group .card:not(:first-child):not(:last-child) .card-img-bottom {\n          border-radius: 0; } }\n\n@media (min-width: 576px) {\n  .card-columns {\n    -webkit-column-count: 3;\n            column-count: 3;\n    -webkit-column-gap: 1.25rem;\n            column-gap: 1.25rem; }\n    .card-columns .card {\n      display: inline-block;\n      width: 100%;\n      margin-bottom: 0.75rem; } }\n\n.breadcrumb {\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: #eceeef;\n  border-radius: 0.25rem; }\n  .breadcrumb::after {\n    display: block;\n    content: \"\";\n    clear: both; }\n\n.breadcrumb-item {\n  float: left; }\n  .breadcrumb-item + .breadcrumb-item::before {\n    display: inline-block;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    color: #636c72;\n    content: \"/\"; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: underline; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: none; }\n  .breadcrumb-item.active {\n    color: #636c72; }\n\n.pagination {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding-left: 0;\n  list-style: none;\n  border-radius: 0.25rem; }\n\n.page-item:first-child .page-link {\n  margin-left: 0;\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.page-item:last-child .page-link {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.page-item.active .page-link {\n  z-index: 2;\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8; }\n\n.page-item.disabled .page-link {\n  color: #636c72;\n  pointer-events: none;\n  cursor: not-allowed;\n  background-color: #fff;\n  border-color: #ddd; }\n\n.page-link {\n  position: relative;\n  display: block;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  line-height: 1.25;\n  color: #0275d8;\n  background-color: #fff;\n  border: 1px solid #ddd; }\n  .page-link:focus, .page-link:hover {\n    color: #014c8c;\n    text-decoration: none;\n    background-color: #eceeef;\n    border-color: #ddd; }\n\n.pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem; }\n\n.pagination-lg .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.3rem;\n  border-top-left-radius: 0.3rem; }\n\n.pagination-lg .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.3rem;\n  border-top-right-radius: 0.3rem; }\n\n.pagination-sm .page-link {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem; }\n\n.pagination-sm .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.2rem;\n  border-top-left-radius: 0.2rem; }\n\n.pagination-sm .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.2rem;\n  border-top-right-radius: 0.2rem; }\n\n.badge {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem; }\n  .badge:empty {\n    display: none; }\n\n.btn .badge, button .badge {\n  position: relative;\n  top: -1px; }\n\na.badge:focus, a.badge:hover {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.badge-pill {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem; }\n\n.badge-default {\n  background-color: #636c72; }\n  .badge-default[href]:focus, .badge-default[href]:hover {\n    background-color: #4b5257; }\n\n.badge-primary {\n  background-color: #0275d8; }\n  .badge-primary[href]:focus, .badge-primary[href]:hover {\n    background-color: #025aa5; }\n\n.badge-success {\n  background-color: #5cb85c; }\n  .badge-success[href]:focus, .badge-success[href]:hover {\n    background-color: #449d44; }\n\n.badge-info {\n  background-color: #5bc0de; }\n  .badge-info[href]:focus, .badge-info[href]:hover {\n    background-color: #31b0d5; }\n\n.badge-warning {\n  background-color: #f0ad4e; }\n  .badge-warning[href]:focus, .badge-warning[href]:hover {\n    background-color: #ec971f; }\n\n.badge-danger {\n  background-color: #d9534f; }\n  .badge-danger[href]:focus, .badge-danger[href]:hover {\n    background-color: #c9302c; }\n\n.jumbotron {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #eceeef;\n  border-radius: 0.3rem; }\n  @media (min-width: 576px) {\n    .jumbotron {\n      padding: 4rem 2rem; } }\n\n.jumbotron-hr {\n  border-top-color: #d0d5d8; }\n\n.jumbotron-fluid {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0; }\n\n.alert {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n\n.alert-heading {\n  color: inherit; }\n\n.alert-link {\n  font-weight: bold; }\n\n.alert-dismissible .close {\n  position: relative;\n  top: -0.75rem;\n  right: -1.25rem;\n  padding: 0.75rem 1.25rem;\n  color: inherit; }\n\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d0e9c6;\n  color: #3c763d; }\n  .alert-success hr {\n    border-top-color: #c1e2b3; }\n  .alert-success .alert-link {\n    color: #2b542c; }\n\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bcdff1;\n  color: #31708f; }\n  .alert-info hr {\n    border-top-color: #a6d5ec; }\n  .alert-info .alert-link {\n    color: #245269; }\n\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #faf2cc;\n  color: #8a6d3b; }\n  .alert-warning hr {\n    border-top-color: #f7ecb5; }\n  .alert-warning .alert-link {\n    color: #66512c; }\n\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #ebcccc;\n  color: #a94442; }\n  .alert-danger hr {\n    border-top-color: #e4b9b9; }\n  .alert-danger .alert-link {\n    color: #843534; }\n\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n.progress {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  overflow: hidden;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  text-align: center;\n  background-color: #eceeef;\n  border-radius: 0.25rem; }\n\n.progress-bar {\n  height: 1rem;\n  color: #fff;\n  background-color: #0275d8; }\n\n.progress-bar-striped {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n.progress-bar-animated {\n  -webkit-animation: progress-bar-stripes 1s linear infinite;\n          animation: progress-bar-stripes 1s linear infinite; }\n\n.media {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start; }\n\n.media-body {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1; }\n\n.list-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0; }\n\n.list-group-item-action {\n  width: 100%;\n  color: #464a4c;\n  text-align: inherit; }\n  .list-group-item-action .list-group-item-heading {\n    color: #292b2c; }\n  .list-group-item-action:focus, .list-group-item-action:hover {\n    color: #464a4c;\n    text-decoration: none;\n    background-color: #f7f7f9; }\n  .list-group-item-action:active {\n    color: #292b2c;\n    background-color: #eceeef; }\n\n.list-group-item {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125); }\n  .list-group-item:first-child {\n    border-top-right-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n  .list-group-item:last-child {\n    margin-bottom: 0;\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n  .list-group-item:focus, .list-group-item:hover {\n    text-decoration: none; }\n  .list-group-item.disabled, .list-group-item:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: #fff; }\n    .list-group-item.disabled .list-group-item-heading, .list-group-item:disabled .list-group-item-heading {\n      color: inherit; }\n    .list-group-item.disabled .list-group-item-text, .list-group-item:disabled .list-group-item-text {\n      color: #636c72; }\n  .list-group-item.active {\n    z-index: 2;\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n    .list-group-item.active .list-group-item-heading,\n    .list-group-item.active .list-group-item-heading > small,\n    .list-group-item.active .list-group-item-heading > .small {\n      color: inherit; }\n    .list-group-item.active .list-group-item-text {\n      color: #daeeff; }\n\n.list-group-flush .list-group-item {\n  border-right: 0;\n  border-left: 0;\n  border-radius: 0; }\n\n.list-group-flush:first-child .list-group-item:first-child {\n  border-top: 0; }\n\n.list-group-flush:last-child .list-group-item:last-child {\n  border-bottom: 0; }\n\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8; }\n\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d; }\n  a.list-group-item-success .list-group-item-heading,\n  button.list-group-item-success .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-success:focus, a.list-group-item-success:hover,\n  button.list-group-item-success:focus,\n  button.list-group-item-success:hover {\n    color: #3c763d;\n    background-color: #d0e9c6; }\n  a.list-group-item-success.active,\n  button.list-group-item-success.active {\n    color: #fff;\n    background-color: #3c763d;\n    border-color: #3c763d; }\n\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7; }\n\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f; }\n  a.list-group-item-info .list-group-item-heading,\n  button.list-group-item-info .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-info:focus, a.list-group-item-info:hover,\n  button.list-group-item-info:focus,\n  button.list-group-item-info:hover {\n    color: #31708f;\n    background-color: #c4e3f3; }\n  a.list-group-item-info.active,\n  button.list-group-item-info.active {\n    color: #fff;\n    background-color: #31708f;\n    border-color: #31708f; }\n\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3; }\n\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b; }\n  a.list-group-item-warning .list-group-item-heading,\n  button.list-group-item-warning .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-warning:focus, a.list-group-item-warning:hover,\n  button.list-group-item-warning:focus,\n  button.list-group-item-warning:hover {\n    color: #8a6d3b;\n    background-color: #faf2cc; }\n  a.list-group-item-warning.active,\n  button.list-group-item-warning.active {\n    color: #fff;\n    background-color: #8a6d3b;\n    border-color: #8a6d3b; }\n\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede; }\n\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442; }\n  a.list-group-item-danger .list-group-item-heading,\n  button.list-group-item-danger .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-danger:focus, a.list-group-item-danger:hover,\n  button.list-group-item-danger:focus,\n  button.list-group-item-danger:hover {\n    color: #a94442;\n    background-color: #ebcccc; }\n  a.list-group-item-danger.active,\n  button.list-group-item-danger.active {\n    color: #fff;\n    background-color: #a94442;\n    border-color: #a94442; }\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 0;\n  overflow: hidden; }\n  .embed-responsive::before {\n    display: block;\n    content: \"\"; }\n  .embed-responsive .embed-responsive-item,\n  .embed-responsive iframe,\n  .embed-responsive embed,\n  .embed-responsive object,\n  .embed-responsive video {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0; }\n\n.embed-responsive-21by9::before {\n  padding-top: 42.85714%; }\n\n.embed-responsive-16by9::before {\n  padding-top: 56.25%; }\n\n.embed-responsive-4by3::before {\n  padding-top: 75%; }\n\n.embed-responsive-1by1::before {\n  padding-top: 100%; }\n\n.close {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: .5; }\n  .close:focus, .close:hover {\n    color: #000;\n    text-decoration: none;\n    cursor: pointer;\n    opacity: .75; }\n\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none; }\n\n.modal-open {\n  overflow: hidden; }\n\n.modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  outline: 0; }\n  .modal.fade .modal-dialog {\n    transition: -webkit-transform 0.3s ease-out;\n    transition: transform 0.3s ease-out;\n    transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;\n    -webkit-transform: translate(0, -25%);\n            transform: translate(0, -25%); }\n  .modal.show .modal-dialog {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0); }\n\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto; }\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px; }\n\n.modal-content {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0; }\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000; }\n  .modal-backdrop.fade {\n    opacity: 0; }\n  .modal-backdrop.show {\n    opacity: 0.5; }\n\n.modal-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 15px;\n  border-bottom: 1px solid #eceeef; }\n\n.modal-title {\n  margin-bottom: 0;\n  line-height: 1.5; }\n\n.modal-body {\n  position: relative;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  padding: 15px; }\n\n.modal-footer {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  padding: 15px;\n  border-top: 1px solid #eceeef; }\n  .modal-footer > :not(:first-child) {\n    margin-left: .25rem; }\n  .modal-footer > :not(:last-child) {\n    margin-right: .25rem; }\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll; }\n\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 500px;\n    margin: 30px auto; }\n  .modal-sm {\n    max-width: 300px; } }\n\n@media (min-width: 992px) {\n  .modal-lg {\n    max-width: 800px; } }\n\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0; }\n  .tooltip.show {\n    opacity: 0.9; }\n  .tooltip.tooltip-top, .tooltip.bs-tether-element-attached-bottom {\n    padding: 5px 0;\n    margin-top: -3px; }\n    .tooltip.tooltip-top .tooltip-inner::before, .tooltip.bs-tether-element-attached-bottom .tooltip-inner::before {\n      bottom: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: \"\";\n      border-width: 5px 5px 0;\n      border-top-color: #000; }\n  .tooltip.tooltip-right, .tooltip.bs-tether-element-attached-left {\n    padding: 0 5px;\n    margin-left: 3px; }\n    .tooltip.tooltip-right .tooltip-inner::before, .tooltip.bs-tether-element-attached-left .tooltip-inner::before {\n      top: 50%;\n      left: 0;\n      margin-top: -5px;\n      content: \"\";\n      border-width: 5px 5px 5px 0;\n      border-right-color: #000; }\n  .tooltip.tooltip-bottom, .tooltip.bs-tether-element-attached-top {\n    padding: 5px 0;\n    margin-top: 3px; }\n    .tooltip.tooltip-bottom .tooltip-inner::before, .tooltip.bs-tether-element-attached-top .tooltip-inner::before {\n      top: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: \"\";\n      border-width: 0 5px 5px;\n      border-bottom-color: #000; }\n  .tooltip.tooltip-left, .tooltip.bs-tether-element-attached-right {\n    padding: 0 5px;\n    margin-left: -3px; }\n    .tooltip.tooltip-left .tooltip-inner::before, .tooltip.bs-tether-element-attached-right .tooltip-inner::before {\n      top: 50%;\n      right: 0;\n      margin-top: -5px;\n      content: \"\";\n      border-width: 5px 0 5px 5px;\n      border-left-color: #000; }\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem; }\n  .tooltip-inner::before {\n    position: absolute;\n    width: 0;\n    height: 0;\n    border-color: transparent;\n    border-style: solid; }\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: block;\n  max-width: 276px;\n  padding: 1px;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem; }\n  .popover.popover-top, .popover.bs-tether-element-attached-bottom {\n    margin-top: -10px; }\n    .popover.popover-top::before, .popover.popover-top::after, .popover.bs-tether-element-attached-bottom::before, .popover.bs-tether-element-attached-bottom::after {\n      left: 50%;\n      border-bottom-width: 0; }\n    .popover.popover-top::before, .popover.bs-tether-element-attached-bottom::before {\n      bottom: -11px;\n      margin-left: -11px;\n      border-top-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-top::after, .popover.bs-tether-element-attached-bottom::after {\n      bottom: -10px;\n      margin-left: -10px;\n      border-top-color: #fff; }\n  .popover.popover-right, .popover.bs-tether-element-attached-left {\n    margin-left: 10px; }\n    .popover.popover-right::before, .popover.popover-right::after, .popover.bs-tether-element-attached-left::before, .popover.bs-tether-element-attached-left::after {\n      top: 50%;\n      border-left-width: 0; }\n    .popover.popover-right::before, .popover.bs-tether-element-attached-left::before {\n      left: -11px;\n      margin-top: -11px;\n      border-right-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-right::after, .popover.bs-tether-element-attached-left::after {\n      left: -10px;\n      margin-top: -10px;\n      border-right-color: #fff; }\n  .popover.popover-bottom, .popover.bs-tether-element-attached-top {\n    margin-top: 10px; }\n    .popover.popover-bottom::before, .popover.popover-bottom::after, .popover.bs-tether-element-attached-top::before, .popover.bs-tether-element-attached-top::after {\n      left: 50%;\n      border-top-width: 0; }\n    .popover.popover-bottom::before, .popover.bs-tether-element-attached-top::before {\n      top: -11px;\n      margin-left: -11px;\n      border-bottom-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-bottom::after, .popover.bs-tether-element-attached-top::after {\n      top: -10px;\n      margin-left: -10px;\n      border-bottom-color: #f7f7f7; }\n    .popover.popover-bottom .popover-title::before, .popover.bs-tether-element-attached-top .popover-title::before {\n      position: absolute;\n      top: 0;\n      left: 50%;\n      display: block;\n      width: 20px;\n      margin-left: -10px;\n      content: \"\";\n      border-bottom: 1px solid #f7f7f7; }\n  .popover.popover-left, .popover.bs-tether-element-attached-right {\n    margin-left: -10px; }\n    .popover.popover-left::before, .popover.popover-left::after, .popover.bs-tether-element-attached-right::before, .popover.bs-tether-element-attached-right::after {\n      top: 50%;\n      border-right-width: 0; }\n    .popover.popover-left::before, .popover.bs-tether-element-attached-right::before {\n      right: -11px;\n      margin-top: -11px;\n      border-left-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-left::after, .popover.bs-tether-element-attached-right::after {\n      right: -10px;\n      margin-top: -10px;\n      border-left-color: #fff; }\n\n.popover-title {\n  padding: 8px 14px;\n  margin-bottom: 0;\n  font-size: 1rem;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-top-right-radius: calc(0.3rem - 1px);\n  border-top-left-radius: calc(0.3rem - 1px); }\n  .popover-title:empty {\n    display: none; }\n\n.popover-content {\n  padding: 9px 14px; }\n\n.popover::before,\n.popover::after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n.popover::before {\n  content: \"\";\n  border-width: 11px; }\n\n.popover::after {\n  content: \"\";\n  border-width: 10px; }\n\n.carousel {\n  position: relative; }\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden; }\n\n.carousel-item {\n  position: relative;\n  display: none;\n  width: 100%; }\n  @media (-webkit-transform-3d) {\n    .carousel-item {\n      transition: -webkit-transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;\n      -webkit-backface-visibility: hidden;\n              backface-visibility: hidden;\n      -webkit-perspective: 1000px;\n              perspective: 1000px; } }\n  @supports ((-webkit-transform: translate3d(0, 0, 0)) or (transform: translate3d(0, 0, 0))) {\n    .carousel-item {\n      transition: -webkit-transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;\n      -webkit-backface-visibility: hidden;\n              backface-visibility: hidden;\n      -webkit-perspective: 1000px;\n              perspective: 1000px; } }\n\n.carousel-item.active,\n.carousel-item-next,\n.carousel-item-prev {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.carousel-item-next,\n.carousel-item-prev {\n  position: absolute;\n  top: 0; }\n\n@media (-webkit-transform-3d) {\n  .carousel-item-next.carousel-item-left,\n  .carousel-item-prev.carousel-item-right {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n  .carousel-item-next,\n  .active.carousel-item-right {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0); }\n  .carousel-item-prev,\n  .active.carousel-item-left {\n    -webkit-transform: translate3d(-100%, 0, 0);\n            transform: translate3d(-100%, 0, 0); } }\n\n@supports ((-webkit-transform: translate3d(0, 0, 0)) or (transform: translate3d(0, 0, 0))) {\n  .carousel-item-next.carousel-item-left,\n  .carousel-item-prev.carousel-item-right {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n  .carousel-item-next,\n  .active.carousel-item-right {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0); }\n  .carousel-item-prev,\n  .active.carousel-item-left {\n    -webkit-transform: translate3d(-100%, 0, 0);\n            transform: translate3d(-100%, 0, 0); } }\n\n.carousel-control-prev,\n.carousel-control-next {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 15%;\n  color: #fff;\n  text-align: center;\n  opacity: 0.5; }\n  .carousel-control-prev:focus, .carousel-control-prev:hover,\n  .carousel-control-next:focus,\n  .carousel-control-next:hover {\n    color: #fff;\n    text-decoration: none;\n    outline: 0;\n    opacity: .9; }\n\n.carousel-control-prev {\n  left: 0; }\n\n.carousel-control-next {\n  right: 0; }\n\n.carousel-control-prev-icon,\n.carousel-control-next-icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background: transparent no-repeat center center;\n  background-size: 100% 100%; }\n\n.carousel-control-prev-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\"); }\n\n.carousel-control-next-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\"); }\n\n.carousel-indicators {\n  position: absolute;\n  right: 0;\n  bottom: 10px;\n  left: 0;\n  z-index: 15;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding-left: 0;\n  margin-right: 15%;\n  margin-left: 15%;\n  list-style: none; }\n  .carousel-indicators li {\n    position: relative;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 0 auto;\n            flex: 1 0 auto;\n    max-width: 30px;\n    height: 3px;\n    margin-right: 3px;\n    margin-left: 3px;\n    text-indent: -999px;\n    cursor: pointer;\n    background-color: rgba(255, 255, 255, 0.5); }\n    .carousel-indicators li::before {\n      position: absolute;\n      top: -10px;\n      left: 0;\n      display: inline-block;\n      width: 100%;\n      height: 10px;\n      content: \"\"; }\n    .carousel-indicators li::after {\n      position: absolute;\n      bottom: -10px;\n      left: 0;\n      display: inline-block;\n      width: 100%;\n      height: 10px;\n      content: \"\"; }\n  .carousel-indicators .active {\n    background-color: #fff; }\n\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center; }\n\n.align-baseline {\n  vertical-align: baseline !important; }\n\n.align-top {\n  vertical-align: top !important; }\n\n.align-middle {\n  vertical-align: middle !important; }\n\n.align-bottom {\n  vertical-align: bottom !important; }\n\n.align-text-bottom {\n  vertical-align: text-bottom !important; }\n\n.align-text-top {\n  vertical-align: text-top !important; }\n\n.bg-faded {\n  background-color: #f7f7f7; }\n\n.bg-primary {\n  background-color: #0275d8 !important; }\n\na.bg-primary:focus, a.bg-primary:hover {\n  background-color: #025aa5 !important; }\n\n.bg-success {\n  background-color: #5cb85c !important; }\n\na.bg-success:focus, a.bg-success:hover {\n  background-color: #449d44 !important; }\n\n.bg-info {\n  background-color: #5bc0de !important; }\n\na.bg-info:focus, a.bg-info:hover {\n  background-color: #31b0d5 !important; }\n\n.bg-warning {\n  background-color: #f0ad4e !important; }\n\na.bg-warning:focus, a.bg-warning:hover {\n  background-color: #ec971f !important; }\n\n.bg-danger {\n  background-color: #d9534f !important; }\n\na.bg-danger:focus, a.bg-danger:hover {\n  background-color: #c9302c !important; }\n\n.bg-inverse {\n  background-color: #292b2c !important; }\n\na.bg-inverse:focus, a.bg-inverse:hover {\n  background-color: #101112 !important; }\n\n.border-0 {\n  border: 0 !important; }\n\n.border-top-0 {\n  border-top: 0 !important; }\n\n.border-right-0 {\n  border-right: 0 !important; }\n\n.border-bottom-0 {\n  border-bottom: 0 !important; }\n\n.border-left-0 {\n  border-left: 0 !important; }\n\n.rounded {\n  border-radius: 0.25rem; }\n\n.rounded-top {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.rounded-right {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.rounded-bottom {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.rounded-left {\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.rounded-circle {\n  border-radius: 50%; }\n\n.rounded-0 {\n  border-radius: 0; }\n\n.clearfix::after {\n  display: block;\n  content: \"\";\n  clear: both; }\n\n.d-none {\n  display: none !important; }\n\n.d-inline {\n  display: inline !important; }\n\n.d-inline-block {\n  display: inline-block !important; }\n\n.d-block {\n  display: block !important; }\n\n.d-table {\n  display: table !important; }\n\n.d-table-cell {\n  display: table-cell !important; }\n\n.d-flex {\n  display: -webkit-box !important;\n  display: -ms-flexbox !important;\n  display: flex !important; }\n\n.d-inline-flex {\n  display: -webkit-inline-box !important;\n  display: -ms-inline-flexbox !important;\n  display: inline-flex !important; }\n\n@media (min-width: 576px) {\n  .d-sm-none {\n    display: none !important; }\n  .d-sm-inline {\n    display: inline !important; }\n  .d-sm-inline-block {\n    display: inline-block !important; }\n  .d-sm-block {\n    display: block !important; }\n  .d-sm-table {\n    display: table !important; }\n  .d-sm-table-cell {\n    display: table-cell !important; }\n  .d-sm-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-sm-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n@media (min-width: 768px) {\n  .d-md-none {\n    display: none !important; }\n  .d-md-inline {\n    display: inline !important; }\n  .d-md-inline-block {\n    display: inline-block !important; }\n  .d-md-block {\n    display: block !important; }\n  .d-md-table {\n    display: table !important; }\n  .d-md-table-cell {\n    display: table-cell !important; }\n  .d-md-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-md-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n@media (min-width: 992px) {\n  .d-lg-none {\n    display: none !important; }\n  .d-lg-inline {\n    display: inline !important; }\n  .d-lg-inline-block {\n    display: inline-block !important; }\n  .d-lg-block {\n    display: block !important; }\n  .d-lg-table {\n    display: table !important; }\n  .d-lg-table-cell {\n    display: table-cell !important; }\n  .d-lg-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-lg-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n@media (min-width: 1200px) {\n  .d-xl-none {\n    display: none !important; }\n  .d-xl-inline {\n    display: inline !important; }\n  .d-xl-inline-block {\n    display: inline-block !important; }\n  .d-xl-block {\n    display: block !important; }\n  .d-xl-table {\n    display: table !important; }\n  .d-xl-table-cell {\n    display: table-cell !important; }\n  .d-xl-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-xl-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n.flex-first {\n  -webkit-box-ordinal-group: 0;\n      -ms-flex-order: -1;\n          order: -1; }\n\n.flex-last {\n  -webkit-box-ordinal-group: 2;\n      -ms-flex-order: 1;\n          order: 1; }\n\n.flex-unordered {\n  -webkit-box-ordinal-group: 1;\n      -ms-flex-order: 0;\n          order: 0; }\n\n.flex-row {\n  -webkit-box-orient: horizontal !important;\n  -webkit-box-direction: normal !important;\n      -ms-flex-direction: row !important;\n          flex-direction: row !important; }\n\n.flex-column {\n  -webkit-box-orient: vertical !important;\n  -webkit-box-direction: normal !important;\n      -ms-flex-direction: column !important;\n          flex-direction: column !important; }\n\n.flex-row-reverse {\n  -webkit-box-orient: horizontal !important;\n  -webkit-box-direction: reverse !important;\n      -ms-flex-direction: row-reverse !important;\n          flex-direction: row-reverse !important; }\n\n.flex-column-reverse {\n  -webkit-box-orient: vertical !important;\n  -webkit-box-direction: reverse !important;\n      -ms-flex-direction: column-reverse !important;\n          flex-direction: column-reverse !important; }\n\n.flex-wrap {\n  -ms-flex-wrap: wrap !important;\n      flex-wrap: wrap !important; }\n\n.flex-nowrap {\n  -ms-flex-wrap: nowrap !important;\n      flex-wrap: nowrap !important; }\n\n.flex-wrap-reverse {\n  -ms-flex-wrap: wrap-reverse !important;\n      flex-wrap: wrap-reverse !important; }\n\n.justify-content-start {\n  -webkit-box-pack: start !important;\n      -ms-flex-pack: start !important;\n          justify-content: flex-start !important; }\n\n.justify-content-end {\n  -webkit-box-pack: end !important;\n      -ms-flex-pack: end !important;\n          justify-content: flex-end !important; }\n\n.justify-content-center {\n  -webkit-box-pack: center !important;\n      -ms-flex-pack: center !important;\n          justify-content: center !important; }\n\n.justify-content-between {\n  -webkit-box-pack: justify !important;\n      -ms-flex-pack: justify !important;\n          justify-content: space-between !important; }\n\n.justify-content-around {\n  -ms-flex-pack: distribute !important;\n      justify-content: space-around !important; }\n\n.align-items-start {\n  -webkit-box-align: start !important;\n      -ms-flex-align: start !important;\n          align-items: flex-start !important; }\n\n.align-items-end {\n  -webkit-box-align: end !important;\n      -ms-flex-align: end !important;\n          align-items: flex-end !important; }\n\n.align-items-center {\n  -webkit-box-align: center !important;\n      -ms-flex-align: center !important;\n          align-items: center !important; }\n\n.align-items-baseline {\n  -webkit-box-align: baseline !important;\n      -ms-flex-align: baseline !important;\n          align-items: baseline !important; }\n\n.align-items-stretch {\n  -webkit-box-align: stretch !important;\n      -ms-flex-align: stretch !important;\n          align-items: stretch !important; }\n\n.align-content-start {\n  -ms-flex-line-pack: start !important;\n      align-content: flex-start !important; }\n\n.align-content-end {\n  -ms-flex-line-pack: end !important;\n      align-content: flex-end !important; }\n\n.align-content-center {\n  -ms-flex-line-pack: center !important;\n      align-content: center !important; }\n\n.align-content-between {\n  -ms-flex-line-pack: justify !important;\n      align-content: space-between !important; }\n\n.align-content-around {\n  -ms-flex-line-pack: distribute !important;\n      align-content: space-around !important; }\n\n.align-content-stretch {\n  -ms-flex-line-pack: stretch !important;\n      align-content: stretch !important; }\n\n.align-self-auto {\n  -ms-flex-item-align: auto !important;\n      -ms-grid-row-align: auto !important;\n      align-self: auto !important; }\n\n.align-self-start {\n  -ms-flex-item-align: start !important;\n      align-self: flex-start !important; }\n\n.align-self-end {\n  -ms-flex-item-align: end !important;\n      align-self: flex-end !important; }\n\n.align-self-center {\n  -ms-flex-item-align: center !important;\n      -ms-grid-row-align: center !important;\n      align-self: center !important; }\n\n.align-self-baseline {\n  -ms-flex-item-align: baseline !important;\n      align-self: baseline !important; }\n\n.align-self-stretch {\n  -ms-flex-item-align: stretch !important;\n      -ms-grid-row-align: stretch !important;\n      align-self: stretch !important; }\n\n@media (min-width: 576px) {\n  .flex-sm-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-sm-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-sm-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-sm-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-sm-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-sm-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-sm-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-sm-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-sm-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-sm-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-sm-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-sm-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-sm-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-sm-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-sm-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-sm-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-sm-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-sm-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-sm-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-sm-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-sm-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-sm-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-sm-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-sm-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-sm-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-sm-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-sm-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-sm-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-sm-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-sm-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-sm-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-sm-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n@media (min-width: 768px) {\n  .flex-md-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-md-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-md-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-md-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-md-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-md-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-md-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-md-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-md-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-md-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-md-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-md-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-md-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-md-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-md-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-md-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-md-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-md-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-md-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-md-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-md-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-md-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-md-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-md-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-md-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-md-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-md-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-md-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-md-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-md-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-md-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-md-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n@media (min-width: 992px) {\n  .flex-lg-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-lg-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-lg-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-lg-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-lg-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-lg-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-lg-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-lg-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-lg-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-lg-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-lg-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-lg-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-lg-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-lg-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-lg-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-lg-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-lg-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-lg-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-lg-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-lg-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-lg-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-lg-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-lg-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-lg-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-lg-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-lg-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-lg-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-lg-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-lg-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-lg-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-lg-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-lg-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n@media (min-width: 1200px) {\n  .flex-xl-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-xl-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-xl-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-xl-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-xl-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-xl-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-xl-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-xl-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-xl-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-xl-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-xl-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-xl-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-xl-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-xl-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-xl-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-xl-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-xl-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-xl-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-xl-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-xl-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-xl-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-xl-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-xl-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-xl-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-xl-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-xl-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-xl-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-xl-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-xl-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-xl-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-xl-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-xl-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n.float-left {\n  float: left !important; }\n\n.float-right {\n  float: right !important; }\n\n.float-none {\n  float: none !important; }\n\n@media (min-width: 576px) {\n  .float-sm-left {\n    float: left !important; }\n  .float-sm-right {\n    float: right !important; }\n  .float-sm-none {\n    float: none !important; } }\n\n@media (min-width: 768px) {\n  .float-md-left {\n    float: left !important; }\n  .float-md-right {\n    float: right !important; }\n  .float-md-none {\n    float: none !important; } }\n\n@media (min-width: 992px) {\n  .float-lg-left {\n    float: left !important; }\n  .float-lg-right {\n    float: right !important; }\n  .float-lg-none {\n    float: none !important; } }\n\n@media (min-width: 1200px) {\n  .float-xl-left {\n    float: left !important; }\n  .float-xl-right {\n    float: right !important; }\n  .float-xl-none {\n    float: none !important; } }\n\n.fixed-top {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n\n.fixed-bottom {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030; }\n\n.sticky-top {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 1030; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n\n.w-25 {\n  width: 25% !important; }\n\n.w-50 {\n  width: 50% !important; }\n\n.w-75 {\n  width: 75% !important; }\n\n.w-100 {\n  width: 100% !important; }\n\n.h-25 {\n  height: 25% !important; }\n\n.h-50 {\n  height: 50% !important; }\n\n.h-75 {\n  height: 75% !important; }\n\n.h-100 {\n  height: 100% !important; }\n\n.mw-100 {\n  max-width: 100% !important; }\n\n.mh-100 {\n  max-height: 100% !important; }\n\n.m-0 {\n  margin: 0 0 !important; }\n\n.mt-0 {\n  margin-top: 0 !important; }\n\n.mr-0 {\n  margin-right: 0 !important; }\n\n.mb-0 {\n  margin-bottom: 0 !important; }\n\n.ml-0 {\n  margin-left: 0 !important; }\n\n.mx-0 {\n  margin-right: 0 !important;\n  margin-left: 0 !important; }\n\n.my-0 {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important; }\n\n.m-1 {\n  margin: 0.25rem 0.25rem !important; }\n\n.mt-1 {\n  margin-top: 0.25rem !important; }\n\n.mr-1 {\n  margin-right: 0.25rem !important; }\n\n.mb-1 {\n  margin-bottom: 0.25rem !important; }\n\n.ml-1 {\n  margin-left: 0.25rem !important; }\n\n.mx-1 {\n  margin-right: 0.25rem !important;\n  margin-left: 0.25rem !important; }\n\n.my-1 {\n  margin-top: 0.25rem !important;\n  margin-bottom: 0.25rem !important; }\n\n.m-2 {\n  margin: 0.5rem 0.5rem !important; }\n\n.mt-2 {\n  margin-top: 0.5rem !important; }\n\n.mr-2 {\n  margin-right: 0.5rem !important; }\n\n.mb-2 {\n  margin-bottom: 0.5rem !important; }\n\n.ml-2 {\n  margin-left: 0.5rem !important; }\n\n.mx-2 {\n  margin-right: 0.5rem !important;\n  margin-left: 0.5rem !important; }\n\n.my-2 {\n  margin-top: 0.5rem !important;\n  margin-bottom: 0.5rem !important; }\n\n.m-3 {\n  margin: 1rem 1rem !important; }\n\n.mt-3 {\n  margin-top: 1rem !important; }\n\n.mr-3 {\n  margin-right: 1rem !important; }\n\n.mb-3 {\n  margin-bottom: 1rem !important; }\n\n.ml-3 {\n  margin-left: 1rem !important; }\n\n.mx-3 {\n  margin-right: 1rem !important;\n  margin-left: 1rem !important; }\n\n.my-3 {\n  margin-top: 1rem !important;\n  margin-bottom: 1rem !important; }\n\n.m-4 {\n  margin: 1.5rem 1.5rem !important; }\n\n.mt-4 {\n  margin-top: 1.5rem !important; }\n\n.mr-4 {\n  margin-right: 1.5rem !important; }\n\n.mb-4 {\n  margin-bottom: 1.5rem !important; }\n\n.ml-4 {\n  margin-left: 1.5rem !important; }\n\n.mx-4 {\n  margin-right: 1.5rem !important;\n  margin-left: 1.5rem !important; }\n\n.my-4 {\n  margin-top: 1.5rem !important;\n  margin-bottom: 1.5rem !important; }\n\n.m-5 {\n  margin: 3rem 3rem !important; }\n\n.mt-5 {\n  margin-top: 3rem !important; }\n\n.mr-5 {\n  margin-right: 3rem !important; }\n\n.mb-5 {\n  margin-bottom: 3rem !important; }\n\n.ml-5 {\n  margin-left: 3rem !important; }\n\n.mx-5 {\n  margin-right: 3rem !important;\n  margin-left: 3rem !important; }\n\n.my-5 {\n  margin-top: 3rem !important;\n  margin-bottom: 3rem !important; }\n\n.p-0 {\n  padding: 0 0 !important; }\n\n.pt-0 {\n  padding-top: 0 !important; }\n\n.pr-0 {\n  padding-right: 0 !important; }\n\n.pb-0 {\n  padding-bottom: 0 !important; }\n\n.pl-0 {\n  padding-left: 0 !important; }\n\n.px-0 {\n  padding-right: 0 !important;\n  padding-left: 0 !important; }\n\n.py-0 {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important; }\n\n.p-1 {\n  padding: 0.25rem 0.25rem !important; }\n\n.pt-1 {\n  padding-top: 0.25rem !important; }\n\n.pr-1 {\n  padding-right: 0.25rem !important; }\n\n.pb-1 {\n  padding-bottom: 0.25rem !important; }\n\n.pl-1 {\n  padding-left: 0.25rem !important; }\n\n.px-1 {\n  padding-right: 0.25rem !important;\n  padding-left: 0.25rem !important; }\n\n.py-1 {\n  padding-top: 0.25rem !important;\n  padding-bottom: 0.25rem !important; }\n\n.p-2 {\n  padding: 0.5rem 0.5rem !important; }\n\n.pt-2 {\n  padding-top: 0.5rem !important; }\n\n.pr-2 {\n  padding-right: 0.5rem !important; }\n\n.pb-2 {\n  padding-bottom: 0.5rem !important; }\n\n.pl-2 {\n  padding-left: 0.5rem !important; }\n\n.px-2 {\n  padding-right: 0.5rem !important;\n  padding-left: 0.5rem !important; }\n\n.py-2 {\n  padding-top: 0.5rem !important;\n  padding-bottom: 0.5rem !important; }\n\n.p-3 {\n  padding: 1rem 1rem !important; }\n\n.pt-3 {\n  padding-top: 1rem !important; }\n\n.pr-3 {\n  padding-right: 1rem !important; }\n\n.pb-3 {\n  padding-bottom: 1rem !important; }\n\n.pl-3 {\n  padding-left: 1rem !important; }\n\n.px-3 {\n  padding-right: 1rem !important;\n  padding-left: 1rem !important; }\n\n.py-3 {\n  padding-top: 1rem !important;\n  padding-bottom: 1rem !important; }\n\n.p-4 {\n  padding: 1.5rem 1.5rem !important; }\n\n.pt-4 {\n  padding-top: 1.5rem !important; }\n\n.pr-4 {\n  padding-right: 1.5rem !important; }\n\n.pb-4 {\n  padding-bottom: 1.5rem !important; }\n\n.pl-4 {\n  padding-left: 1.5rem !important; }\n\n.px-4 {\n  padding-right: 1.5rem !important;\n  padding-left: 1.5rem !important; }\n\n.py-4 {\n  padding-top: 1.5rem !important;\n  padding-bottom: 1.5rem !important; }\n\n.p-5 {\n  padding: 3rem 3rem !important; }\n\n.pt-5 {\n  padding-top: 3rem !important; }\n\n.pr-5 {\n  padding-right: 3rem !important; }\n\n.pb-5 {\n  padding-bottom: 3rem !important; }\n\n.pl-5 {\n  padding-left: 3rem !important; }\n\n.px-5 {\n  padding-right: 3rem !important;\n  padding-left: 3rem !important; }\n\n.py-5 {\n  padding-top: 3rem !important;\n  padding-bottom: 3rem !important; }\n\n.m-auto {\n  margin: auto !important; }\n\n.mt-auto {\n  margin-top: auto !important; }\n\n.mr-auto {\n  margin-right: auto !important; }\n\n.mb-auto {\n  margin-bottom: auto !important; }\n\n.ml-auto {\n  margin-left: auto !important; }\n\n.mx-auto {\n  margin-right: auto !important;\n  margin-left: auto !important; }\n\n.my-auto {\n  margin-top: auto !important;\n  margin-bottom: auto !important; }\n\n@media (min-width: 576px) {\n  .m-sm-0 {\n    margin: 0 0 !important; }\n  .mt-sm-0 {\n    margin-top: 0 !important; }\n  .mr-sm-0 {\n    margin-right: 0 !important; }\n  .mb-sm-0 {\n    margin-bottom: 0 !important; }\n  .ml-sm-0 {\n    margin-left: 0 !important; }\n  .mx-sm-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-sm-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-sm-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-sm-1 {\n    margin-top: 0.25rem !important; }\n  .mr-sm-1 {\n    margin-right: 0.25rem !important; }\n  .mb-sm-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-sm-1 {\n    margin-left: 0.25rem !important; }\n  .mx-sm-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-sm-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-sm-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-sm-2 {\n    margin-top: 0.5rem !important; }\n  .mr-sm-2 {\n    margin-right: 0.5rem !important; }\n  .mb-sm-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-sm-2 {\n    margin-left: 0.5rem !important; }\n  .mx-sm-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-sm-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-sm-3 {\n    margin: 1rem 1rem !important; }\n  .mt-sm-3 {\n    margin-top: 1rem !important; }\n  .mr-sm-3 {\n    margin-right: 1rem !important; }\n  .mb-sm-3 {\n    margin-bottom: 1rem !important; }\n  .ml-sm-3 {\n    margin-left: 1rem !important; }\n  .mx-sm-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-sm-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-sm-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-sm-4 {\n    margin-top: 1.5rem !important; }\n  .mr-sm-4 {\n    margin-right: 1.5rem !important; }\n  .mb-sm-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-sm-4 {\n    margin-left: 1.5rem !important; }\n  .mx-sm-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-sm-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-sm-5 {\n    margin: 3rem 3rem !important; }\n  .mt-sm-5 {\n    margin-top: 3rem !important; }\n  .mr-sm-5 {\n    margin-right: 3rem !important; }\n  .mb-sm-5 {\n    margin-bottom: 3rem !important; }\n  .ml-sm-5 {\n    margin-left: 3rem !important; }\n  .mx-sm-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-sm-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-sm-0 {\n    padding: 0 0 !important; }\n  .pt-sm-0 {\n    padding-top: 0 !important; }\n  .pr-sm-0 {\n    padding-right: 0 !important; }\n  .pb-sm-0 {\n    padding-bottom: 0 !important; }\n  .pl-sm-0 {\n    padding-left: 0 !important; }\n  .px-sm-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-sm-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-sm-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-sm-1 {\n    padding-top: 0.25rem !important; }\n  .pr-sm-1 {\n    padding-right: 0.25rem !important; }\n  .pb-sm-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-sm-1 {\n    padding-left: 0.25rem !important; }\n  .px-sm-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-sm-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-sm-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-sm-2 {\n    padding-top: 0.5rem !important; }\n  .pr-sm-2 {\n    padding-right: 0.5rem !important; }\n  .pb-sm-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-sm-2 {\n    padding-left: 0.5rem !important; }\n  .px-sm-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-sm-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-sm-3 {\n    padding: 1rem 1rem !important; }\n  .pt-sm-3 {\n    padding-top: 1rem !important; }\n  .pr-sm-3 {\n    padding-right: 1rem !important; }\n  .pb-sm-3 {\n    padding-bottom: 1rem !important; }\n  .pl-sm-3 {\n    padding-left: 1rem !important; }\n  .px-sm-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-sm-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-sm-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-sm-4 {\n    padding-top: 1.5rem !important; }\n  .pr-sm-4 {\n    padding-right: 1.5rem !important; }\n  .pb-sm-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-sm-4 {\n    padding-left: 1.5rem !important; }\n  .px-sm-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-sm-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-sm-5 {\n    padding: 3rem 3rem !important; }\n  .pt-sm-5 {\n    padding-top: 3rem !important; }\n  .pr-sm-5 {\n    padding-right: 3rem !important; }\n  .pb-sm-5 {\n    padding-bottom: 3rem !important; }\n  .pl-sm-5 {\n    padding-left: 3rem !important; }\n  .px-sm-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-sm-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-sm-auto {\n    margin: auto !important; }\n  .mt-sm-auto {\n    margin-top: auto !important; }\n  .mr-sm-auto {\n    margin-right: auto !important; }\n  .mb-sm-auto {\n    margin-bottom: auto !important; }\n  .ml-sm-auto {\n    margin-left: auto !important; }\n  .mx-sm-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-sm-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 768px) {\n  .m-md-0 {\n    margin: 0 0 !important; }\n  .mt-md-0 {\n    margin-top: 0 !important; }\n  .mr-md-0 {\n    margin-right: 0 !important; }\n  .mb-md-0 {\n    margin-bottom: 0 !important; }\n  .ml-md-0 {\n    margin-left: 0 !important; }\n  .mx-md-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-md-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-md-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-md-1 {\n    margin-top: 0.25rem !important; }\n  .mr-md-1 {\n    margin-right: 0.25rem !important; }\n  .mb-md-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-md-1 {\n    margin-left: 0.25rem !important; }\n  .mx-md-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-md-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-md-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-md-2 {\n    margin-top: 0.5rem !important; }\n  .mr-md-2 {\n    margin-right: 0.5rem !important; }\n  .mb-md-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-md-2 {\n    margin-left: 0.5rem !important; }\n  .mx-md-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-md-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-md-3 {\n    margin: 1rem 1rem !important; }\n  .mt-md-3 {\n    margin-top: 1rem !important; }\n  .mr-md-3 {\n    margin-right: 1rem !important; }\n  .mb-md-3 {\n    margin-bottom: 1rem !important; }\n  .ml-md-3 {\n    margin-left: 1rem !important; }\n  .mx-md-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-md-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-md-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-md-4 {\n    margin-top: 1.5rem !important; }\n  .mr-md-4 {\n    margin-right: 1.5rem !important; }\n  .mb-md-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-md-4 {\n    margin-left: 1.5rem !important; }\n  .mx-md-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-md-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-md-5 {\n    margin: 3rem 3rem !important; }\n  .mt-md-5 {\n    margin-top: 3rem !important; }\n  .mr-md-5 {\n    margin-right: 3rem !important; }\n  .mb-md-5 {\n    margin-bottom: 3rem !important; }\n  .ml-md-5 {\n    margin-left: 3rem !important; }\n  .mx-md-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-md-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-md-0 {\n    padding: 0 0 !important; }\n  .pt-md-0 {\n    padding-top: 0 !important; }\n  .pr-md-0 {\n    padding-right: 0 !important; }\n  .pb-md-0 {\n    padding-bottom: 0 !important; }\n  .pl-md-0 {\n    padding-left: 0 !important; }\n  .px-md-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-md-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-md-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-md-1 {\n    padding-top: 0.25rem !important; }\n  .pr-md-1 {\n    padding-right: 0.25rem !important; }\n  .pb-md-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-md-1 {\n    padding-left: 0.25rem !important; }\n  .px-md-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-md-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-md-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-md-2 {\n    padding-top: 0.5rem !important; }\n  .pr-md-2 {\n    padding-right: 0.5rem !important; }\n  .pb-md-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-md-2 {\n    padding-left: 0.5rem !important; }\n  .px-md-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-md-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-md-3 {\n    padding: 1rem 1rem !important; }\n  .pt-md-3 {\n    padding-top: 1rem !important; }\n  .pr-md-3 {\n    padding-right: 1rem !important; }\n  .pb-md-3 {\n    padding-bottom: 1rem !important; }\n  .pl-md-3 {\n    padding-left: 1rem !important; }\n  .px-md-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-md-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-md-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-md-4 {\n    padding-top: 1.5rem !important; }\n  .pr-md-4 {\n    padding-right: 1.5rem !important; }\n  .pb-md-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-md-4 {\n    padding-left: 1.5rem !important; }\n  .px-md-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-md-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-md-5 {\n    padding: 3rem 3rem !important; }\n  .pt-md-5 {\n    padding-top: 3rem !important; }\n  .pr-md-5 {\n    padding-right: 3rem !important; }\n  .pb-md-5 {\n    padding-bottom: 3rem !important; }\n  .pl-md-5 {\n    padding-left: 3rem !important; }\n  .px-md-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-md-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-md-auto {\n    margin: auto !important; }\n  .mt-md-auto {\n    margin-top: auto !important; }\n  .mr-md-auto {\n    margin-right: auto !important; }\n  .mb-md-auto {\n    margin-bottom: auto !important; }\n  .ml-md-auto {\n    margin-left: auto !important; }\n  .mx-md-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-md-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 992px) {\n  .m-lg-0 {\n    margin: 0 0 !important; }\n  .mt-lg-0 {\n    margin-top: 0 !important; }\n  .mr-lg-0 {\n    margin-right: 0 !important; }\n  .mb-lg-0 {\n    margin-bottom: 0 !important; }\n  .ml-lg-0 {\n    margin-left: 0 !important; }\n  .mx-lg-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-lg-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-lg-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-lg-1 {\n    margin-top: 0.25rem !important; }\n  .mr-lg-1 {\n    margin-right: 0.25rem !important; }\n  .mb-lg-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-lg-1 {\n    margin-left: 0.25rem !important; }\n  .mx-lg-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-lg-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-lg-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-lg-2 {\n    margin-top: 0.5rem !important; }\n  .mr-lg-2 {\n    margin-right: 0.5rem !important; }\n  .mb-lg-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-lg-2 {\n    margin-left: 0.5rem !important; }\n  .mx-lg-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-lg-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-lg-3 {\n    margin: 1rem 1rem !important; }\n  .mt-lg-3 {\n    margin-top: 1rem !important; }\n  .mr-lg-3 {\n    margin-right: 1rem !important; }\n  .mb-lg-3 {\n    margin-bottom: 1rem !important; }\n  .ml-lg-3 {\n    margin-left: 1rem !important; }\n  .mx-lg-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-lg-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-lg-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-lg-4 {\n    margin-top: 1.5rem !important; }\n  .mr-lg-4 {\n    margin-right: 1.5rem !important; }\n  .mb-lg-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-lg-4 {\n    margin-left: 1.5rem !important; }\n  .mx-lg-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-lg-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-lg-5 {\n    margin: 3rem 3rem !important; }\n  .mt-lg-5 {\n    margin-top: 3rem !important; }\n  .mr-lg-5 {\n    margin-right: 3rem !important; }\n  .mb-lg-5 {\n    margin-bottom: 3rem !important; }\n  .ml-lg-5 {\n    margin-left: 3rem !important; }\n  .mx-lg-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-lg-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-lg-0 {\n    padding: 0 0 !important; }\n  .pt-lg-0 {\n    padding-top: 0 !important; }\n  .pr-lg-0 {\n    padding-right: 0 !important; }\n  .pb-lg-0 {\n    padding-bottom: 0 !important; }\n  .pl-lg-0 {\n    padding-left: 0 !important; }\n  .px-lg-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-lg-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-lg-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-lg-1 {\n    padding-top: 0.25rem !important; }\n  .pr-lg-1 {\n    padding-right: 0.25rem !important; }\n  .pb-lg-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-lg-1 {\n    padding-left: 0.25rem !important; }\n  .px-lg-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-lg-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-lg-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-lg-2 {\n    padding-top: 0.5rem !important; }\n  .pr-lg-2 {\n    padding-right: 0.5rem !important; }\n  .pb-lg-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-lg-2 {\n    padding-left: 0.5rem !important; }\n  .px-lg-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-lg-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-lg-3 {\n    padding: 1rem 1rem !important; }\n  .pt-lg-3 {\n    padding-top: 1rem !important; }\n  .pr-lg-3 {\n    padding-right: 1rem !important; }\n  .pb-lg-3 {\n    padding-bottom: 1rem !important; }\n  .pl-lg-3 {\n    padding-left: 1rem !important; }\n  .px-lg-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-lg-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-lg-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-lg-4 {\n    padding-top: 1.5rem !important; }\n  .pr-lg-4 {\n    padding-right: 1.5rem !important; }\n  .pb-lg-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-lg-4 {\n    padding-left: 1.5rem !important; }\n  .px-lg-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-lg-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-lg-5 {\n    padding: 3rem 3rem !important; }\n  .pt-lg-5 {\n    padding-top: 3rem !important; }\n  .pr-lg-5 {\n    padding-right: 3rem !important; }\n  .pb-lg-5 {\n    padding-bottom: 3rem !important; }\n  .pl-lg-5 {\n    padding-left: 3rem !important; }\n  .px-lg-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-lg-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-lg-auto {\n    margin: auto !important; }\n  .mt-lg-auto {\n    margin-top: auto !important; }\n  .mr-lg-auto {\n    margin-right: auto !important; }\n  .mb-lg-auto {\n    margin-bottom: auto !important; }\n  .ml-lg-auto {\n    margin-left: auto !important; }\n  .mx-lg-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-lg-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 1200px) {\n  .m-xl-0 {\n    margin: 0 0 !important; }\n  .mt-xl-0 {\n    margin-top: 0 !important; }\n  .mr-xl-0 {\n    margin-right: 0 !important; }\n  .mb-xl-0 {\n    margin-bottom: 0 !important; }\n  .ml-xl-0 {\n    margin-left: 0 !important; }\n  .mx-xl-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-xl-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-xl-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-xl-1 {\n    margin-top: 0.25rem !important; }\n  .mr-xl-1 {\n    margin-right: 0.25rem !important; }\n  .mb-xl-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-xl-1 {\n    margin-left: 0.25rem !important; }\n  .mx-xl-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-xl-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-xl-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-xl-2 {\n    margin-top: 0.5rem !important; }\n  .mr-xl-2 {\n    margin-right: 0.5rem !important; }\n  .mb-xl-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-xl-2 {\n    margin-left: 0.5rem !important; }\n  .mx-xl-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-xl-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-xl-3 {\n    margin: 1rem 1rem !important; }\n  .mt-xl-3 {\n    margin-top: 1rem !important; }\n  .mr-xl-3 {\n    margin-right: 1rem !important; }\n  .mb-xl-3 {\n    margin-bottom: 1rem !important; }\n  .ml-xl-3 {\n    margin-left: 1rem !important; }\n  .mx-xl-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-xl-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-xl-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-xl-4 {\n    margin-top: 1.5rem !important; }\n  .mr-xl-4 {\n    margin-right: 1.5rem !important; }\n  .mb-xl-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-xl-4 {\n    margin-left: 1.5rem !important; }\n  .mx-xl-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-xl-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-xl-5 {\n    margin: 3rem 3rem !important; }\n  .mt-xl-5 {\n    margin-top: 3rem !important; }\n  .mr-xl-5 {\n    margin-right: 3rem !important; }\n  .mb-xl-5 {\n    margin-bottom: 3rem !important; }\n  .ml-xl-5 {\n    margin-left: 3rem !important; }\n  .mx-xl-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-xl-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-xl-0 {\n    padding: 0 0 !important; }\n  .pt-xl-0 {\n    padding-top: 0 !important; }\n  .pr-xl-0 {\n    padding-right: 0 !important; }\n  .pb-xl-0 {\n    padding-bottom: 0 !important; }\n  .pl-xl-0 {\n    padding-left: 0 !important; }\n  .px-xl-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-xl-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-xl-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-xl-1 {\n    padding-top: 0.25rem !important; }\n  .pr-xl-1 {\n    padding-right: 0.25rem !important; }\n  .pb-xl-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-xl-1 {\n    padding-left: 0.25rem !important; }\n  .px-xl-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-xl-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-xl-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-xl-2 {\n    padding-top: 0.5rem !important; }\n  .pr-xl-2 {\n    padding-right: 0.5rem !important; }\n  .pb-xl-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-xl-2 {\n    padding-left: 0.5rem !important; }\n  .px-xl-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-xl-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-xl-3 {\n    padding: 1rem 1rem !important; }\n  .pt-xl-3 {\n    padding-top: 1rem !important; }\n  .pr-xl-3 {\n    padding-right: 1rem !important; }\n  .pb-xl-3 {\n    padding-bottom: 1rem !important; }\n  .pl-xl-3 {\n    padding-left: 1rem !important; }\n  .px-xl-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-xl-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-xl-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-xl-4 {\n    padding-top: 1.5rem !important; }\n  .pr-xl-4 {\n    padding-right: 1.5rem !important; }\n  .pb-xl-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-xl-4 {\n    padding-left: 1.5rem !important; }\n  .px-xl-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-xl-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-xl-5 {\n    padding: 3rem 3rem !important; }\n  .pt-xl-5 {\n    padding-top: 3rem !important; }\n  .pr-xl-5 {\n    padding-right: 3rem !important; }\n  .pb-xl-5 {\n    padding-bottom: 3rem !important; }\n  .pl-xl-5 {\n    padding-left: 3rem !important; }\n  .px-xl-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-xl-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-xl-auto {\n    margin: auto !important; }\n  .mt-xl-auto {\n    margin-top: auto !important; }\n  .mr-xl-auto {\n    margin-right: auto !important; }\n  .mb-xl-auto {\n    margin-bottom: auto !important; }\n  .ml-xl-auto {\n    margin-left: auto !important; }\n  .mx-xl-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-xl-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n.text-justify {\n  text-align: justify !important; }\n\n.text-nowrap {\n  white-space: nowrap !important; }\n\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.text-left {\n  text-align: left !important; }\n\n.text-right, dl.row dt {\n  text-align: right !important; }\n\n.text-center {\n  text-align: center !important; }\n\n@media (min-width: 576px) {\n  .text-sm-left {\n    text-align: left !important; }\n  .text-sm-right {\n    text-align: right !important; }\n  .text-sm-center {\n    text-align: center !important; } }\n\n@media (min-width: 768px) {\n  .text-md-left {\n    text-align: left !important; }\n  .text-md-right {\n    text-align: right !important; }\n  .text-md-center {\n    text-align: center !important; } }\n\n@media (min-width: 992px) {\n  .text-lg-left {\n    text-align: left !important; }\n  .text-lg-right {\n    text-align: right !important; }\n  .text-lg-center {\n    text-align: center !important; } }\n\n@media (min-width: 1200px) {\n  .text-xl-left {\n    text-align: left !important; }\n  .text-xl-right {\n    text-align: right !important; }\n  .text-xl-center {\n    text-align: center !important; } }\n\n.text-lowercase {\n  text-transform: lowercase !important; }\n\n.text-uppercase {\n  text-transform: uppercase !important; }\n\n.text-capitalize {\n  text-transform: capitalize !important; }\n\n.font-weight-normal {\n  font-weight: normal; }\n\n.font-weight-bold {\n  font-weight: bold; }\n\n.font-italic {\n  font-style: italic; }\n\n.text-white {\n  color: #fff !important; }\n\n.text-muted {\n  color: #636c72 !important; }\n\na.text-muted:focus, a.text-muted:hover {\n  color: #4b5257 !important; }\n\n.text-primary {\n  color: #0275d8 !important; }\n\na.text-primary:focus, a.text-primary:hover {\n  color: #025aa5 !important; }\n\n.text-success {\n  color: #5cb85c !important; }\n\na.text-success:focus, a.text-success:hover {\n  color: #449d44 !important; }\n\n.text-info {\n  color: #5bc0de !important; }\n\na.text-info:focus, a.text-info:hover {\n  color: #31b0d5 !important; }\n\n.text-warning {\n  color: #f0ad4e !important; }\n\na.text-warning:focus, a.text-warning:hover {\n  color: #ec971f !important; }\n\n.text-danger {\n  color: #d9534f !important; }\n\na.text-danger:focus, a.text-danger:hover {\n  color: #c9302c !important; }\n\n.text-gray-dark {\n  color: #292b2c !important; }\n\na.text-gray-dark:focus, a.text-gray-dark:hover {\n  color: #101112 !important; }\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.invisible {\n  visibility: hidden !important; }\n\n.hidden-xs-up {\n  display: none !important; }\n\n@media (max-width: 575px) {\n  .hidden-xs-down {\n    display: none !important; } }\n\n@media (min-width: 576px) {\n  .hidden-sm-up {\n    display: none !important; } }\n\n@media (max-width: 767px) {\n  .hidden-sm-down {\n    display: none !important; } }\n\n@media (min-width: 768px) {\n  .hidden-md-up {\n    display: none !important; } }\n\n@media (max-width: 991px) {\n  .hidden-md-down {\n    display: none !important; } }\n\n@media (min-width: 992px) {\n  .hidden-lg-up {\n    display: none !important; } }\n\n@media (max-width: 1199px) {\n  .hidden-lg-down {\n    display: none !important; } }\n\n@media (min-width: 1200px) {\n  .hidden-xl-up {\n    display: none !important; } }\n\n.hidden-xl-down {\n  display: none !important; }\n\n.visible-print-block {\n  display: none !important; }\n  @media print {\n    .visible-print-block {\n      display: block !important; } }\n\n.visible-print-inline {\n  display: none !important; }\n  @media print {\n    .visible-print-inline {\n      display: inline !important; } }\n\n.visible-print-inline-block {\n  display: none !important; }\n  @media print {\n    .visible-print-inline-block {\n      display: inline-block !important; } }\n\n@media print {\n  .hidden-print {\n    display: none !important; } }\n\nhtml {\n  box-sizing: border-box; }\n\n*, *:before, *:after {\n  box-sizing: inherit; }\n\nhtml, body {\n  height: 100%;\n  margin: 0;\n  padding: 0; }\n\nbody {\n  background-color: #F8F8F8; }\n\nsection {\n  margin-bottom: 30px;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  border: 0 solid #CCC;\n  border-top-width: 1px; }\n\nbutton, input, optgroup, select, textarea {\n  font-family: inherit; }\n\ninput.auto, textarea.auto, select.auto {\n  width: auto; }\n\ninput[type=checkbox] {\n  -webkit-transform: translateY(6px);\n          transform: translateY(6px);\n  width: auto; }\n\ndl.row dt.wide, dl.row dt.wide + dd {\n  text-align: left !important;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 100%;\n          flex: 0 0 100%;\n  width: 100%;\n  max-width: 100%; }\n\ndl.row dd {\n  margin-bottom: 0.1rem; }\n\nthead, tfoot {\n  background-color: #EEE; }\n\ntfoot {\n  border-top: 2px solid #98ABA6;\n  border-bottom: 1px solid #98ABA6; }\n\n.visually-hidden, label.checkbox input {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.text-overflow {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\nlabel.checkbox span {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background-color: #EEE;\n  color: #F8F8F8;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 20px;\n  text-align: center;\n  box-shadow: 0 0 0 1px #D3D3D3;\n  border-radius: 2px; }\n  label.checkbox span:before {\n    content: '\\2713'; }\n\nlabel.checkbox input:checked + span {\n  color: #0275d8; }\n\ntable, .table thead th, table thead th, .table th, table th, .table td, table td {\n  border-color: #98ABA6; }\n\nth:last-child {\n  text-align: right; }\n\n.table tr.alert-paid th, table tr.alert-paid th, .table tr.alert-paid td, table tr.alert-paid td {\n  border-color: gainsboro; }\n\ntable, input {\n  max-width: 100%; }\n\ntable tr > *:nth-child(4), table tr > *:nth-child(4) .form-control, table tr > *:nth-child(4) input, table tr > *:nth-child(4) textarea, table tr > *:nth-child(4) select {\n  width: 80px; }\n\ntable tr > *:nth-child(5), table tr > *:nth-child(5) .form-control, table tr > *:nth-child(5) input, table tr > *:nth-child(5) textarea, table tr > *:nth-child(5) select {\n  width: 120px; }\n\ntable tr > *:nth-child(6), table tr > *:nth-child(6) .form-control, table tr > *:nth-child(6) input, table tr > *:nth-child(6) textarea, table tr > *:nth-child(6) select {\n  width: 80px; }\n\ntable tr > *:nth-child(7), table tr > *:nth-child(7) .form-control, table tr > *:nth-child(7) input, table tr > *:nth-child(7) textarea, table tr > *:nth-child(7) select {\n  width: 60px; }\n\ntable tr > *:nth-child(8), table tr > *:nth-child(8) .form-control, table tr > *:nth-child(8) input, table tr > *:nth-child(8) textarea, table tr > *:nth-child(8) select {\n  width: 120px; }\n\ntable tr > *:nth-child(3),\ntable tr > *:nth-child(4) {\n  display: none; }\n\n@media (min-width: 576px) {\n  table tr > *:nth-child(3),\n  table tr > *:nth-child(4) {\n    display: table-cell; } }\n\n.alert-paid {\n  color: #c2c2c2;\n  background-color: transparent;\n  border-color: gainsboro; }\n\n.alert-paid a {\n  color: inherit; }\n\n.alert-late {\n  color: #a6321d;\n  background-color: #fff1f8;\n  border-color: #d4d4d4; }\n\n.alert-late a {\n  color: inherit; }\n\n.alert-late.alert-pending {\n  color: #a66b29;\n  background-color: #fff4e2; }\n\n.alert-paid input.checkbox:checked + label {\n  background-color: transparent;\n  color: #CCC; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 616:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "td > app-currency {\n  width: 80px;\n  margin-left: 10px; }\n\nthead th {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  width: 10%; }\n  thead th:nth-child(1), thead th:nth-child(3) {\n    width: 30%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 617:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* You can add global styles to this file, and also import other style files */\n/*!\n * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)\n * Copyright 2011-2017 The Bootstrap Authors\n * Copyright 2011-2017 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nfigcaption,\nfigure,\nmain {\n  display: block; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible; }\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\na {\n  background-color: transparent;\n  -webkit-text-decoration-skip: objects; }\n\na:active,\na:hover {\n  outline-width: 0; }\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline;\n  text-decoration: underline dotted; }\n\nb,\nstrong {\n  font-weight: inherit; }\n\nb,\nstrong {\n  font-weight: bolder; }\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\ndfn {\n  font-style: italic; }\n\nmark {\n  background-color: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\naudio,\nvideo {\n  display: inline-block; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\nimg {\n  border-style: none; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  font-size: 100%;\n  line-height: 1.15;\n  margin: 0; }\n\nbutton,\ninput {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0;\n  white-space: normal; }\n\nprogress {\n  display: inline-block;\n  vertical-align: baseline; }\n\ntextarea {\n  overflow: auto; }\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px; }\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit; }\n\ndetails,\nmenu {\n  display: block; }\n\nsummary {\n  display: list-item; }\n\ncanvas {\n  display: inline-block; }\n\ntemplate {\n  display: none; }\n\n[hidden] {\n  display: none; }\n\n@media print {\n  *,\n  *::before,\n  *::after,\n  p::first-letter,\n  div::first-letter,\n  blockquote::first-letter,\n  li::first-letter,\n  p::first-line,\n  div::first-line,\n  blockquote::first-line,\n  li::first-line {\n    text-shadow: none !important;\n    box-shadow: none !important; }\n  a,\n  a:visited {\n    text-decoration: underline; }\n  abbr[title]::after {\n    content: \" (\" attr(title) \")\"; }\n  pre {\n    white-space: pre-wrap !important; }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; }\n  .navbar {\n    display: none; }\n  .badge {\n    border: 1px solid #000; }\n  .table, table {\n    border-collapse: collapse !important; }\n    .table td, table td,\n    .table th, table th {\n      background-color: #fff !important; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important; } }\n\nhtml {\n  box-sizing: border-box; }\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit; }\n\n@-ms-viewport {\n  width: device-width; }\n\nhtml {\n  -ms-overflow-style: scrollbar;\n  -webkit-tap-highlight-color: transparent; }\n\nbody {\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.5;\n  color: #292b2c;\n  background-color: #fff; }\n\n[tabindex=\"-1\"]:focus {\n  outline: none !important; }\n\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: .5rem; }\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nabbr[title],\nabbr[data-original-title] {\n  cursor: help; }\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit; }\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0; }\n\ndt {\n  font-weight: bold; }\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0; }\n\nblockquote {\n  margin: 0 0 1rem; }\n\na {\n  color: #0275d8;\n  text-decoration: none; }\n  a:focus, a:hover {\n    color: #014c8c;\n    text-decoration: underline; }\n\na:not([href]):not([tabindex]) {\n  color: inherit;\n  text-decoration: none; }\n  a:not([href]):not([tabindex]):focus, a:not([href]):not([tabindex]):hover {\n    color: inherit;\n    text-decoration: none; }\n  a:not([href]):not([tabindex]):focus {\n    outline: 0; }\n\npre {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto; }\n\nfigure {\n  margin: 0 0 1rem; }\n\nimg {\n  vertical-align: middle; }\n\n[role=\"button\"] {\n  cursor: pointer; }\n\na,\narea,\nbutton,\n[role=\"button\"],\ninput,\nlabel,\nselect,\nsummary,\ntextarea {\n  -ms-touch-action: manipulation;\n      touch-action: manipulation; }\n\ntable {\n  border-collapse: collapse;\n  background-color: transparent; }\n\ncaption {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #636c72;\n  text-align: left;\n  caption-side: bottom; }\n\nth {\n  text-align: left; }\n\nlabel {\n  display: inline-block;\n  margin-bottom: .5rem; }\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  line-height: inherit; }\n\ninput[type=\"radio\"]:disabled,\ninput[type=\"checkbox\"]:disabled {\n  cursor: not-allowed; }\n\ninput[type=\"date\"],\ninput[type=\"time\"],\ninput[type=\"datetime-local\"],\ninput[type=\"month\"] {\n  -webkit-appearance: listbox; }\n\ntextarea {\n  resize: vertical; }\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: .5rem;\n  font-size: 1.5rem;\n  line-height: inherit; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: none; }\n\noutput {\n  display: inline-block; }\n\n[hidden] {\n  display: none !important; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  margin-bottom: 0.5rem;\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit; }\n\nh1, .h1 {\n  font-size: 2.5rem; }\n\nh2, .h2 {\n  font-size: 2rem; }\n\nh3, .h3 {\n  font-size: 1.75rem; }\n\nh4, .h4 {\n  font-size: 1.5rem; }\n\nh5, .h5 {\n  font-size: 1.25rem; }\n\nh6, .h6 {\n  font-size: 1rem; }\n\n.lead {\n  font-size: 1.25rem;\n  font-weight: 300; }\n\n.display-1 {\n  font-size: 6rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-2 {\n  font-size: 5.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-3 {\n  font-size: 4.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\n.display-4 {\n  font-size: 3.5rem;\n  font-weight: 300;\n  line-height: 1.1; }\n\nhr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1); }\n\nsmall,\n.small {\n  font-size: 80%;\n  font-weight: normal; }\n\nmark,\n.mark {\n  padding: 0.2em;\n  background-color: #fcf8e3; }\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline-item {\n  display: inline-block; }\n  .list-inline-item:not(:last-child) {\n    margin-right: 5px; }\n\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase; }\n\n.blockquote {\n  padding: 0.5rem 1rem;\n  margin-bottom: 1rem;\n  font-size: 1.25rem;\n  border-left: 0.25rem solid #eceeef; }\n\n.blockquote-footer {\n  display: block;\n  font-size: 80%;\n  color: #636c72; }\n  .blockquote-footer::before {\n    content: \"\\2014   \\A0\"; }\n\n.blockquote-reverse {\n  padding-right: 1rem;\n  padding-left: 0;\n  text-align: right;\n  border-right: 0.25rem solid #eceeef;\n  border-left: 0; }\n\n.blockquote-reverse .blockquote-footer::before {\n  content: \"\"; }\n\n.blockquote-reverse .blockquote-footer::after {\n  content: \"\\A0   \\2014\"; }\n\n.img-fluid {\n  max-width: 100%;\n  height: auto; }\n\n.img-thumbnail {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 0.25rem;\n  transition: all 0.2s ease-in-out;\n  max-width: 100%;\n  height: auto; }\n\n.figure {\n  display: inline-block; }\n\n.figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1; }\n\n.figure-caption {\n  font-size: 90%;\n  color: #636c72; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; }\n\ncode {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #bd4147;\n  background-color: #f7f7f9;\n  border-radius: 0.25rem; }\n  a > code {\n    padding: 0;\n    color: inherit;\n    background-color: inherit; }\n\nkbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #fff;\n  background-color: #292b2c;\n  border-radius: 0.2rem; }\n  kbd kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: bold; }\n\npre {\n  display: block;\n  margin-top: 0;\n  margin-bottom: 1rem;\n  font-size: 90%;\n  color: #292b2c; }\n  pre code {\n    padding: 0;\n    font-size: inherit;\n    color: inherit;\n    background-color: transparent;\n    border-radius: 0; }\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll; }\n\n.container {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .container {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 576px) {\n    .container {\n      width: 540px;\n      max-width: 100%; } }\n  @media (min-width: 768px) {\n    .container {\n      width: 720px;\n      max-width: 100%; } }\n  @media (min-width: 992px) {\n    .container {\n      width: 960px;\n      max-width: 100%; } }\n  @media (min-width: 1200px) {\n    .container {\n      width: 1140px;\n      max-width: 100%; } }\n\n.container-fluid {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .container-fluid {\n      padding-right: 15px;\n      padding-left: 15px; } }\n\n.row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px; }\n  @media (min-width: 576px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 768px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 992px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 1200px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n\n.no-gutters {\n  margin-right: 0;\n  margin-left: 0; }\n  .no-gutters > .col,\n  .no-gutters > [class*=\"col-\"] {\n    padding-right: 0;\n    padding-left: 0; }\n\n.col-1, .col-2, .col-3, .col-4, dl.row dt, .col-5, .col-6, .col-7, .col-8, dl.row dd, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n  position: relative;\n  width: 100%;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .col-1, .col-2, .col-3, .col-4, dl.row dt, .col-5, .col-6, .col-7, .col-8, dl.row dd, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .col-1, .col-2, .col-3, .col-4, dl.row dt, .col-5, .col-6, .col-7, .col-8, dl.row dd, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .col-1, .col-2, .col-3, .col-4, dl.row dt, .col-5, .col-6, .col-7, .col-8, dl.row dd, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .col-1, .col-2, .col-3, .col-4, dl.row dt, .col-5, .col-6, .col-7, .col-8, dl.row dd, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n      padding-right: 15px;\n      padding-left: 15px; } }\n\n.col {\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  max-width: 100%; }\n\n.col-auto {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n  width: auto; }\n\n.col-1 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 8.33333%;\n          flex: 0 0 8.33333%;\n  max-width: 8.33333%; }\n\n.col-2 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 16.66667%;\n          flex: 0 0 16.66667%;\n  max-width: 16.66667%; }\n\n.col-3 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 25%;\n          flex: 0 0 25%;\n  max-width: 25%; }\n\n.col-4, dl.row dt {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 33.33333%;\n          flex: 0 0 33.33333%;\n  max-width: 33.33333%; }\n\n.col-5 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 41.66667%;\n          flex: 0 0 41.66667%;\n  max-width: 41.66667%; }\n\n.col-6 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 50%;\n          flex: 0 0 50%;\n  max-width: 50%; }\n\n.col-7 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 58.33333%;\n          flex: 0 0 58.33333%;\n  max-width: 58.33333%; }\n\n.col-8, dl.row dd {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 66.66667%;\n          flex: 0 0 66.66667%;\n  max-width: 66.66667%; }\n\n.col-9 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 75%;\n          flex: 0 0 75%;\n  max-width: 75%; }\n\n.col-10 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 83.33333%;\n          flex: 0 0 83.33333%;\n  max-width: 83.33333%; }\n\n.col-11 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 91.66667%;\n          flex: 0 0 91.66667%;\n  max-width: 91.66667%; }\n\n.col-12 {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 100%;\n          flex: 0 0 100%;\n  max-width: 100%; }\n\n.pull-0 {\n  right: auto; }\n\n.pull-1 {\n  right: 8.33333%; }\n\n.pull-2 {\n  right: 16.66667%; }\n\n.pull-3 {\n  right: 25%; }\n\n.pull-4 {\n  right: 33.33333%; }\n\n.pull-5 {\n  right: 41.66667%; }\n\n.pull-6 {\n  right: 50%; }\n\n.pull-7 {\n  right: 58.33333%; }\n\n.pull-8 {\n  right: 66.66667%; }\n\n.pull-9 {\n  right: 75%; }\n\n.pull-10 {\n  right: 83.33333%; }\n\n.pull-11 {\n  right: 91.66667%; }\n\n.pull-12 {\n  right: 100%; }\n\n.push-0 {\n  left: auto; }\n\n.push-1 {\n  left: 8.33333%; }\n\n.push-2 {\n  left: 16.66667%; }\n\n.push-3 {\n  left: 25%; }\n\n.push-4 {\n  left: 33.33333%; }\n\n.push-5 {\n  left: 41.66667%; }\n\n.push-6 {\n  left: 50%; }\n\n.push-7 {\n  left: 58.33333%; }\n\n.push-8 {\n  left: 66.66667%; }\n\n.push-9 {\n  left: 75%; }\n\n.push-10 {\n  left: 83.33333%; }\n\n.push-11 {\n  left: 91.66667%; }\n\n.push-12 {\n  left: 100%; }\n\n.offset-1 {\n  margin-left: 8.33333%; }\n\n.offset-2 {\n  margin-left: 16.66667%; }\n\n.offset-3 {\n  margin-left: 25%; }\n\n.offset-4 {\n  margin-left: 33.33333%; }\n\n.offset-5 {\n  margin-left: 41.66667%; }\n\n.offset-6 {\n  margin-left: 50%; }\n\n.offset-7 {\n  margin-left: 58.33333%; }\n\n.offset-8 {\n  margin-left: 66.66667%; }\n\n.offset-9 {\n  margin-left: 75%; }\n\n.offset-10 {\n  margin-left: 83.33333%; }\n\n.offset-11 {\n  margin-left: 91.66667%; }\n\n@media (min-width: 576px) {\n  .col-sm {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-sm-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-sm-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333%;\n            flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-sm-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66667%;\n            flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-sm-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-sm-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333%;\n            flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-sm-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66667%;\n            flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-sm-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-sm-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333%;\n            flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-sm-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66667%;\n            flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-sm-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-sm-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333%;\n            flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-sm-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66667%;\n            flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-sm-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-sm-0 {\n    right: auto; }\n  .pull-sm-1 {\n    right: 8.33333%; }\n  .pull-sm-2 {\n    right: 16.66667%; }\n  .pull-sm-3 {\n    right: 25%; }\n  .pull-sm-4 {\n    right: 33.33333%; }\n  .pull-sm-5 {\n    right: 41.66667%; }\n  .pull-sm-6 {\n    right: 50%; }\n  .pull-sm-7 {\n    right: 58.33333%; }\n  .pull-sm-8 {\n    right: 66.66667%; }\n  .pull-sm-9 {\n    right: 75%; }\n  .pull-sm-10 {\n    right: 83.33333%; }\n  .pull-sm-11 {\n    right: 91.66667%; }\n  .pull-sm-12 {\n    right: 100%; }\n  .push-sm-0 {\n    left: auto; }\n  .push-sm-1 {\n    left: 8.33333%; }\n  .push-sm-2 {\n    left: 16.66667%; }\n  .push-sm-3 {\n    left: 25%; }\n  .push-sm-4 {\n    left: 33.33333%; }\n  .push-sm-5 {\n    left: 41.66667%; }\n  .push-sm-6 {\n    left: 50%; }\n  .push-sm-7 {\n    left: 58.33333%; }\n  .push-sm-8 {\n    left: 66.66667%; }\n  .push-sm-9 {\n    left: 75%; }\n  .push-sm-10 {\n    left: 83.33333%; }\n  .push-sm-11 {\n    left: 91.66667%; }\n  .push-sm-12 {\n    left: 100%; }\n  .offset-sm-0 {\n    margin-left: 0%; }\n  .offset-sm-1 {\n    margin-left: 8.33333%; }\n  .offset-sm-2 {\n    margin-left: 16.66667%; }\n  .offset-sm-3 {\n    margin-left: 25%; }\n  .offset-sm-4 {\n    margin-left: 33.33333%; }\n  .offset-sm-5 {\n    margin-left: 41.66667%; }\n  .offset-sm-6 {\n    margin-left: 50%; }\n  .offset-sm-7 {\n    margin-left: 58.33333%; }\n  .offset-sm-8 {\n    margin-left: 66.66667%; }\n  .offset-sm-9 {\n    margin-left: 75%; }\n  .offset-sm-10 {\n    margin-left: 83.33333%; }\n  .offset-sm-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 768px) {\n  .col-md {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-md-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-md-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333%;\n            flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-md-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66667%;\n            flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-md-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-md-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333%;\n            flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-md-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66667%;\n            flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-md-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-md-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333%;\n            flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-md-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66667%;\n            flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-md-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-md-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333%;\n            flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-md-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66667%;\n            flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-md-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-md-0 {\n    right: auto; }\n  .pull-md-1 {\n    right: 8.33333%; }\n  .pull-md-2 {\n    right: 16.66667%; }\n  .pull-md-3 {\n    right: 25%; }\n  .pull-md-4 {\n    right: 33.33333%; }\n  .pull-md-5 {\n    right: 41.66667%; }\n  .pull-md-6 {\n    right: 50%; }\n  .pull-md-7 {\n    right: 58.33333%; }\n  .pull-md-8 {\n    right: 66.66667%; }\n  .pull-md-9 {\n    right: 75%; }\n  .pull-md-10 {\n    right: 83.33333%; }\n  .pull-md-11 {\n    right: 91.66667%; }\n  .pull-md-12 {\n    right: 100%; }\n  .push-md-0 {\n    left: auto; }\n  .push-md-1 {\n    left: 8.33333%; }\n  .push-md-2 {\n    left: 16.66667%; }\n  .push-md-3 {\n    left: 25%; }\n  .push-md-4 {\n    left: 33.33333%; }\n  .push-md-5 {\n    left: 41.66667%; }\n  .push-md-6 {\n    left: 50%; }\n  .push-md-7 {\n    left: 58.33333%; }\n  .push-md-8 {\n    left: 66.66667%; }\n  .push-md-9 {\n    left: 75%; }\n  .push-md-10 {\n    left: 83.33333%; }\n  .push-md-11 {\n    left: 91.66667%; }\n  .push-md-12 {\n    left: 100%; }\n  .offset-md-0 {\n    margin-left: 0%; }\n  .offset-md-1 {\n    margin-left: 8.33333%; }\n  .offset-md-2 {\n    margin-left: 16.66667%; }\n  .offset-md-3 {\n    margin-left: 25%; }\n  .offset-md-4 {\n    margin-left: 33.33333%; }\n  .offset-md-5 {\n    margin-left: 41.66667%; }\n  .offset-md-6 {\n    margin-left: 50%; }\n  .offset-md-7 {\n    margin-left: 58.33333%; }\n  .offset-md-8 {\n    margin-left: 66.66667%; }\n  .offset-md-9 {\n    margin-left: 75%; }\n  .offset-md-10 {\n    margin-left: 83.33333%; }\n  .offset-md-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 992px) {\n  .col-lg {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-lg-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-lg-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333%;\n            flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-lg-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66667%;\n            flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-lg-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-lg-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333%;\n            flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-lg-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66667%;\n            flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-lg-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-lg-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333%;\n            flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-lg-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66667%;\n            flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-lg-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-lg-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333%;\n            flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-lg-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66667%;\n            flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-lg-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-lg-0 {\n    right: auto; }\n  .pull-lg-1 {\n    right: 8.33333%; }\n  .pull-lg-2 {\n    right: 16.66667%; }\n  .pull-lg-3 {\n    right: 25%; }\n  .pull-lg-4 {\n    right: 33.33333%; }\n  .pull-lg-5 {\n    right: 41.66667%; }\n  .pull-lg-6 {\n    right: 50%; }\n  .pull-lg-7 {\n    right: 58.33333%; }\n  .pull-lg-8 {\n    right: 66.66667%; }\n  .pull-lg-9 {\n    right: 75%; }\n  .pull-lg-10 {\n    right: 83.33333%; }\n  .pull-lg-11 {\n    right: 91.66667%; }\n  .pull-lg-12 {\n    right: 100%; }\n  .push-lg-0 {\n    left: auto; }\n  .push-lg-1 {\n    left: 8.33333%; }\n  .push-lg-2 {\n    left: 16.66667%; }\n  .push-lg-3 {\n    left: 25%; }\n  .push-lg-4 {\n    left: 33.33333%; }\n  .push-lg-5 {\n    left: 41.66667%; }\n  .push-lg-6 {\n    left: 50%; }\n  .push-lg-7 {\n    left: 58.33333%; }\n  .push-lg-8 {\n    left: 66.66667%; }\n  .push-lg-9 {\n    left: 75%; }\n  .push-lg-10 {\n    left: 83.33333%; }\n  .push-lg-11 {\n    left: 91.66667%; }\n  .push-lg-12 {\n    left: 100%; }\n  .offset-lg-0 {\n    margin-left: 0%; }\n  .offset-lg-1 {\n    margin-left: 8.33333%; }\n  .offset-lg-2 {\n    margin-left: 16.66667%; }\n  .offset-lg-3 {\n    margin-left: 25%; }\n  .offset-lg-4 {\n    margin-left: 33.33333%; }\n  .offset-lg-5 {\n    margin-left: 41.66667%; }\n  .offset-lg-6 {\n    margin-left: 50%; }\n  .offset-lg-7 {\n    margin-left: 58.33333%; }\n  .offset-lg-8 {\n    margin-left: 66.66667%; }\n  .offset-lg-9 {\n    margin-left: 75%; }\n  .offset-lg-10 {\n    margin-left: 83.33333%; }\n  .offset-lg-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 1200px) {\n  .col-xl {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%; }\n  .col-xl-auto {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto; }\n  .col-xl-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 8.33333%;\n            flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-xl-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 16.66667%;\n            flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-xl-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%; }\n  .col-xl-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 33.33333%;\n            flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-xl-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 41.66667%;\n            flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-xl-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%; }\n  .col-xl-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 58.33333%;\n            flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-xl-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 66.66667%;\n            flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-xl-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%; }\n  .col-xl-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 83.33333%;\n            flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-xl-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 91.66667%;\n            flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-xl-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%; }\n  .pull-xl-0 {\n    right: auto; }\n  .pull-xl-1 {\n    right: 8.33333%; }\n  .pull-xl-2 {\n    right: 16.66667%; }\n  .pull-xl-3 {\n    right: 25%; }\n  .pull-xl-4 {\n    right: 33.33333%; }\n  .pull-xl-5 {\n    right: 41.66667%; }\n  .pull-xl-6 {\n    right: 50%; }\n  .pull-xl-7 {\n    right: 58.33333%; }\n  .pull-xl-8 {\n    right: 66.66667%; }\n  .pull-xl-9 {\n    right: 75%; }\n  .pull-xl-10 {\n    right: 83.33333%; }\n  .pull-xl-11 {\n    right: 91.66667%; }\n  .pull-xl-12 {\n    right: 100%; }\n  .push-xl-0 {\n    left: auto; }\n  .push-xl-1 {\n    left: 8.33333%; }\n  .push-xl-2 {\n    left: 16.66667%; }\n  .push-xl-3 {\n    left: 25%; }\n  .push-xl-4 {\n    left: 33.33333%; }\n  .push-xl-5 {\n    left: 41.66667%; }\n  .push-xl-6 {\n    left: 50%; }\n  .push-xl-7 {\n    left: 58.33333%; }\n  .push-xl-8 {\n    left: 66.66667%; }\n  .push-xl-9 {\n    left: 75%; }\n  .push-xl-10 {\n    left: 83.33333%; }\n  .push-xl-11 {\n    left: 91.66667%; }\n  .push-xl-12 {\n    left: 100%; }\n  .offset-xl-0 {\n    margin-left: 0%; }\n  .offset-xl-1 {\n    margin-left: 8.33333%; }\n  .offset-xl-2 {\n    margin-left: 16.66667%; }\n  .offset-xl-3 {\n    margin-left: 25%; }\n  .offset-xl-4 {\n    margin-left: 33.33333%; }\n  .offset-xl-5 {\n    margin-left: 41.66667%; }\n  .offset-xl-6 {\n    margin-left: 50%; }\n  .offset-xl-7 {\n    margin-left: 58.33333%; }\n  .offset-xl-8 {\n    margin-left: 66.66667%; }\n  .offset-xl-9 {\n    margin-left: 75%; }\n  .offset-xl-10 {\n    margin-left: 83.33333%; }\n  .offset-xl-11 {\n    margin-left: 91.66667%; } }\n\n.table, table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 1rem; }\n  .table th, table th,\n  .table td, table td {\n    padding: 0.75rem;\n    vertical-align: top;\n    border-top: 1px solid #eceeef; }\n  .table thead th, table thead th {\n    vertical-align: bottom;\n    border-bottom: 2px solid #eceeef; }\n  .table tbody + tbody, table tbody + tbody {\n    border-top: 2px solid #eceeef; }\n  .table .table, table .table, .table table, table table {\n    background-color: #fff; }\n\n.table-sm th, table th,\n.table-sm td, table td {\n  padding: 0.3rem; }\n\n.table-bordered {\n  border: 1px solid #eceeef; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #eceeef; }\n  .table-bordered thead th,\n  .table-bordered thead td {\n    border-bottom-width: 2px; }\n\n.table-striped tbody tr:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.05); }\n\n.table-hover tbody tr:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-active,\n.table-active > th,\n.table-active > td {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-hover .table-active:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n  .table-hover .table-active:hover > td,\n  .table-hover .table-active:hover > th {\n    background-color: rgba(0, 0, 0, 0.075); }\n\n.table-success,\n.table-success > th,\n.table-success > td {\n  background-color: #dff0d8; }\n\n.table-hover .table-success:hover {\n  background-color: #d0e9c6; }\n  .table-hover .table-success:hover > td,\n  .table-hover .table-success:hover > th {\n    background-color: #d0e9c6; }\n\n.table-info,\n.table-info > th,\n.table-info > td {\n  background-color: #d9edf7; }\n\n.table-hover .table-info:hover {\n  background-color: #c4e3f3; }\n  .table-hover .table-info:hover > td,\n  .table-hover .table-info:hover > th {\n    background-color: #c4e3f3; }\n\n.table-warning,\n.table-warning > th,\n.table-warning > td {\n  background-color: #fcf8e3; }\n\n.table-hover .table-warning:hover {\n  background-color: #faf2cc; }\n  .table-hover .table-warning:hover > td,\n  .table-hover .table-warning:hover > th {\n    background-color: #faf2cc; }\n\n.table-danger,\n.table-danger > th,\n.table-danger > td {\n  background-color: #f2dede; }\n\n.table-hover .table-danger:hover {\n  background-color: #ebcccc; }\n  .table-hover .table-danger:hover > td,\n  .table-hover .table-danger:hover > th {\n    background-color: #ebcccc; }\n\n.thead-inverse th {\n  color: #fff;\n  background-color: #292b2c; }\n\n.thead-default th {\n  color: #464a4c;\n  background-color: #eceeef; }\n\n.table-inverse {\n  color: #fff;\n  background-color: #292b2c; }\n  .table-inverse th,\n  .table-inverse td,\n  .table-inverse thead th {\n    border-color: #fff; }\n  .table-inverse.table-bordered {\n    border: 0; }\n\n.table-responsive {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  -ms-overflow-style: -ms-autohiding-scrollbar; }\n  .table-responsive.table-bordered {\n    border: 0; }\n\n.form-control, input, textarea, select {\n  display: block;\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.25;\n  color: #464a4c;\n  background-color: #fff;\n  background-image: none;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; }\n  .form-control::-ms-expand, input::-ms-expand, textarea::-ms-expand, select::-ms-expand {\n    background-color: transparent;\n    border: 0; }\n  .form-control:focus, input:focus, textarea:focus, select:focus {\n    color: #464a4c;\n    background-color: #fff;\n    border-color: #5cb3fd;\n    outline: none; }\n  .form-control::-webkit-input-placeholder, input::-webkit-input-placeholder, textarea::-webkit-input-placeholder, select::-webkit-input-placeholder {\n    color: #636c72;\n    opacity: 1; }\n  .form-control:-ms-input-placeholder, input:-ms-input-placeholder, textarea:-ms-input-placeholder, select:-ms-input-placeholder {\n    color: #636c72;\n    opacity: 1; }\n  .form-control::placeholder, input::placeholder, textarea::placeholder, select::placeholder {\n    color: #636c72;\n    opacity: 1; }\n  .form-control:disabled, input:disabled, textarea:disabled, select:disabled, .form-control[readonly], input[readonly], textarea[readonly], select[readonly] {\n    background-color: #eceeef;\n    opacity: 1; }\n  .form-control:disabled, input:disabled, textarea:disabled, select:disabled {\n    cursor: not-allowed; }\n\nselect.form-control:not([size]):not([multiple]), select:not([size]):not([multiple]) {\n  height: calc(2.25rem + 2px); }\n\nselect.form-control:focus::-ms-value, select:focus::-ms-value {\n  color: #464a4c;\n  background-color: #fff; }\n\n.form-control-file,\n.form-control-range {\n  display: block; }\n\n.col-form-label {\n  padding-top: calc(0.5rem - 1px * 2);\n  padding-bottom: calc(0.5rem - 1px * 2);\n  margin-bottom: 0; }\n\n.col-form-label-lg {\n  padding-top: calc(0.75rem - 1px * 2);\n  padding-bottom: calc(0.75rem - 1px * 2);\n  font-size: 1.25rem; }\n\n.col-form-label-sm {\n  padding-top: calc(0.25rem - 1px * 2);\n  padding-bottom: calc(0.25rem - 1px * 2);\n  font-size: 0.875rem; }\n\n.col-form-legend {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  font-size: 1rem; }\n\n.form-control-static {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  line-height: 1.25;\n  border: solid transparent;\n  border-width: 1px 0; }\n  .form-control-static.form-control-sm, .input-group-sm > .form-control-static.form-control, .input-group-sm > input.form-control-static, .input-group-sm > textarea.form-control-static, .input-group-sm > select.form-control-static,\n  .input-group-sm > .form-control-static.input-group-addon,\n  .input-group-sm > .input-group-btn > .form-control-static.btn,\n  .input-group-sm > .input-group-btn > button.form-control-static, input.form-control-static, textarea.form-control-static, select.form-control-static, .form-control-static.form-control-lg, .input-group-lg > .form-control-static.form-control, .input-group-lg > input.form-control-static, .input-group-lg > textarea.form-control-static, .input-group-lg > select.form-control-static,\n  .input-group-lg > .form-control-static.input-group-addon,\n  .input-group-lg > .input-group-btn > .form-control-static.btn,\n  .input-group-lg > .input-group-btn > button.form-control-static {\n    padding-right: 0;\n    padding-left: 0; }\n\n.form-control-sm, .input-group-sm > .form-control, .input-group-sm > input, .input-group-sm > textarea, .input-group-sm > select,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn,\n.input-group-sm > .input-group-btn > button, input, textarea, select {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\nselect.form-control-sm:not([size]):not([multiple]),\n.input-group-sm > .input-group-btn > select.btn:not([size]):not([multiple]), select:not([size]):not([multiple]) {\n  height: 1.8125rem; }\n\n.form-control-lg, .input-group-lg > .form-control, .input-group-lg > input, .input-group-lg > textarea, .input-group-lg > select,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn,\n.input-group-lg > .input-group-btn > button {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\nselect.form-control-lg:not([size]):not([multiple]), .input-group-lg > select:not([size]):not([multiple]),\n.input-group-lg > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 3.16667rem; }\n\n.form-group {\n  margin-bottom: 1rem; }\n\n.form-text {\n  display: block;\n  margin-top: 0.25rem; }\n\n.form-check {\n  position: relative;\n  display: block;\n  margin-bottom: 0.5rem; }\n  .form-check.disabled .form-check-label {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.form-check-label {\n  padding-left: 1.25rem;\n  margin-bottom: 0;\n  cursor: pointer; }\n\n.form-check-input {\n  position: absolute;\n  margin-top: 0.25rem;\n  margin-left: -1.25rem; }\n  .form-check-input:only-child {\n    position: static; }\n\n.form-check-inline {\n  display: inline-block; }\n  .form-check-inline .form-check-label {\n    vertical-align: middle; }\n  .form-check-inline + .form-check-inline {\n    margin-left: 0.75rem; }\n\n.form-control-feedback {\n  margin-top: 0.25rem; }\n\n.form-control-success,\n.form-control-warning,\n.form-control-danger {\n  padding-right: 2.25rem;\n  background-repeat: no-repeat;\n  background-position: center right 0.5625rem;\n  background-size: 1.125rem 1.125rem; }\n\n.has-success .form-control-feedback,\n.has-success .form-control-label,\n.has-success .col-form-label,\n.has-success .form-check-label,\n.has-success .custom-control {\n  color: #5cb85c; }\n\n.has-success .form-control, .has-success input, .has-success textarea, .has-success select {\n  border-color: #5cb85c; }\n\n.has-success .input-group-addon {\n  color: #5cb85c;\n  border-color: #5cb85c;\n  background-color: #eaf6ea; }\n\n.has-success .form-control-success {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%235cb85c' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\"); }\n\n.has-warning .form-control-feedback,\n.has-warning .form-control-label,\n.has-warning .col-form-label,\n.has-warning .form-check-label,\n.has-warning .custom-control {\n  color: #f0ad4e; }\n\n.has-warning .form-control, .has-warning input, .has-warning textarea, .has-warning select {\n  border-color: #f0ad4e; }\n\n.has-warning .input-group-addon {\n  color: #f0ad4e;\n  border-color: #f0ad4e;\n  background-color: white; }\n\n.has-warning .form-control-warning {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23f0ad4e' d='M4.4 5.324h-.8v-2.46h.8zm0 1.42h-.8V5.89h.8zM3.76.63L.04 7.075c-.115.2.016.425.26.426h7.397c.242 0 .372-.226.258-.426C6.726 4.924 5.47 2.79 4.253.63c-.113-.174-.39-.174-.494 0z'/%3E%3C/svg%3E\"); }\n\n.has-danger .form-control-feedback,\n.has-danger .form-control-label,\n.has-danger .col-form-label,\n.has-danger .form-check-label,\n.has-danger .custom-control {\n  color: #d9534f; }\n\n.has-danger .form-control, .has-danger input, .has-danger textarea, .has-danger select {\n  border-color: #d9534f; }\n\n.has-danger .input-group-addon {\n  color: #d9534f;\n  border-color: #d9534f;\n  background-color: #fdf7f7; }\n\n.has-danger .form-control-danger {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23d9534f' viewBox='-2 -2 7 7'%3E%3Cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3E%3Ccircle r='.5'/%3E%3Ccircle cx='3' r='.5'/%3E%3Ccircle cy='3' r='.5'/%3E%3Ccircle cx='3' cy='3' r='.5'/%3E%3C/svg%3E\"); }\n\n.form-inline {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .form-inline .form-check {\n    width: 100%; }\n  @media (min-width: 576px) {\n    .form-inline label {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      margin-bottom: 0; }\n    .form-inline .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-flex: 0;\n          -ms-flex: 0 0 auto;\n              flex: 0 0 auto;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-flow: row wrap;\n              flex-flow: row wrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 0; }\n    .form-inline .form-control, .form-inline input, .form-inline textarea, .form-inline select {\n      display: inline-block;\n      width: auto;\n      vertical-align: middle; }\n    .form-inline .form-control-static {\n      display: inline-block; }\n    .form-inline .input-group {\n      width: auto; }\n    .form-inline .form-control-label {\n      margin-bottom: 0;\n      vertical-align: middle; }\n    .form-inline .form-check {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      width: auto;\n      margin-top: 0;\n      margin-bottom: 0; }\n    .form-inline .form-check-label {\n      padding-left: 0; }\n    .form-inline .form-check-input {\n      position: relative;\n      margin-top: 0;\n      margin-right: 0.25rem;\n      margin-left: 0; }\n    .form-inline .custom-control {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      padding-left: 0; }\n    .form-inline .custom-control-indicator {\n      position: static;\n      display: inline-block;\n      margin-right: 0.25rem;\n      vertical-align: text-bottom; }\n    .form-inline .has-feedback .form-control-feedback {\n      top: 0; } }\n\n.btn, button {\n  display: inline-block;\n  font-weight: normal;\n  line-height: 1.25;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  border: 1px solid transparent;\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n  border-radius: 0.25rem;\n  transition: all 0.2s ease-in-out; }\n  .btn:focus, button:focus, .btn:hover, button:hover {\n    text-decoration: none; }\n  .btn:focus, button:focus, .btn.focus, button.focus {\n    outline: 0;\n    box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25); }\n  .btn.disabled, button.disabled, .btn:disabled, button:disabled {\n    cursor: not-allowed;\n    opacity: .65; }\n  .btn:active, button:active, .btn.active, button.active {\n    background-image: none; }\n\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8; }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #025aa5;\n    border-color: #01549b; }\n  .btn-primary:focus, .btn-primary.focus {\n    box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5); }\n  .btn-primary.disabled, .btn-primary:disabled {\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-primary:active, .btn-primary.active,\n  .show > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #025aa5;\n    background-image: none;\n    border-color: #01549b; }\n\n.btn-secondary {\n  color: #292b2c;\n  background-color: #fff;\n  border-color: #ccc; }\n  .btn-secondary:hover {\n    color: #292b2c;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n  .btn-secondary:focus, .btn-secondary.focus {\n    box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5); }\n  .btn-secondary.disabled, .btn-secondary:disabled {\n    background-color: #fff;\n    border-color: #ccc; }\n  .btn-secondary:active, .btn-secondary.active,\n  .show > .btn-secondary.dropdown-toggle {\n    color: #292b2c;\n    background-color: #e6e6e6;\n    background-image: none;\n    border-color: #adadad; }\n\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #5bc0de; }\n  .btn-info:hover {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #2aabd2; }\n  .btn-info:focus, .btn-info.focus {\n    box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5); }\n  .btn-info.disabled, .btn-info:disabled {\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-info:active, .btn-info.active,\n  .show > .btn-info.dropdown-toggle {\n    color: #fff;\n    background-color: #31b0d5;\n    background-image: none;\n    border-color: #2aabd2; }\n\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #5cb85c; }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #419641; }\n  .btn-success:focus, .btn-success.focus {\n    box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5); }\n  .btn-success.disabled, .btn-success:disabled {\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-success:active, .btn-success.active,\n  .show > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #449d44;\n    background-image: none;\n    border-color: #419641; }\n\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #f0ad4e; }\n  .btn-warning:hover {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #eb9316; }\n  .btn-warning:focus, .btn-warning.focus {\n    box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5); }\n  .btn-warning.disabled, .btn-warning:disabled {\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-warning:active, .btn-warning.active,\n  .show > .btn-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #ec971f;\n    background-image: none;\n    border-color: #eb9316; }\n\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d9534f; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #c12e2a; }\n  .btn-danger:focus, .btn-danger.focus {\n    box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5); }\n  .btn-danger.disabled, .btn-danger:disabled {\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-danger:active, .btn-danger.active,\n  .show > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #c9302c;\n    background-image: none;\n    border-color: #c12e2a; }\n\n.btn-outline-primary {\n  color: #0275d8;\n  background-image: none;\n  background-color: transparent;\n  border-color: #0275d8; }\n  .btn-outline-primary:hover {\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-outline-primary:focus, .btn-outline-primary.focus {\n    box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5); }\n  .btn-outline-primary.disabled, .btn-outline-primary:disabled {\n    color: #0275d8;\n    background-color: transparent; }\n  .btn-outline-primary:active, .btn-outline-primary.active,\n  .show > .btn-outline-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n\n.btn-outline-secondary {\n  color: #ccc;\n  background-image: none;\n  background-color: transparent;\n  border-color: #ccc; }\n  .btn-outline-secondary:hover {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n  .btn-outline-secondary:focus, .btn-outline-secondary.focus {\n    box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5); }\n  .btn-outline-secondary.disabled, .btn-outline-secondary:disabled {\n    color: #ccc;\n    background-color: transparent; }\n  .btn-outline-secondary:active, .btn-outline-secondary.active,\n  .show > .btn-outline-secondary.dropdown-toggle {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n\n.btn-outline-info {\n  color: #5bc0de;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5bc0de; }\n  .btn-outline-info:hover {\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-outline-info:focus, .btn-outline-info.focus {\n    box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5); }\n  .btn-outline-info.disabled, .btn-outline-info:disabled {\n    color: #5bc0de;\n    background-color: transparent; }\n  .btn-outline-info:active, .btn-outline-info.active,\n  .show > .btn-outline-info.dropdown-toggle {\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n\n.btn-outline-success {\n  color: #5cb85c;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5cb85c; }\n  .btn-outline-success:hover {\n    color: #fff;\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-outline-success:focus, .btn-outline-success.focus {\n    box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5); }\n  .btn-outline-success.disabled, .btn-outline-success:disabled {\n    color: #5cb85c;\n    background-color: transparent; }\n  .btn-outline-success:active, .btn-outline-success.active,\n  .show > .btn-outline-success.dropdown-toggle {\n    color: #fff;\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n\n.btn-outline-warning {\n  color: #f0ad4e;\n  background-image: none;\n  background-color: transparent;\n  border-color: #f0ad4e; }\n  .btn-outline-warning:hover {\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-outline-warning:focus, .btn-outline-warning.focus {\n    box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5); }\n  .btn-outline-warning.disabled, .btn-outline-warning:disabled {\n    color: #f0ad4e;\n    background-color: transparent; }\n  .btn-outline-warning:active, .btn-outline-warning.active,\n  .show > .btn-outline-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n\n.btn-outline-danger {\n  color: #d9534f;\n  background-image: none;\n  background-color: transparent;\n  border-color: #d9534f; }\n  .btn-outline-danger:hover {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-outline-danger:focus, .btn-outline-danger.focus {\n    box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5); }\n  .btn-outline-danger.disabled, .btn-outline-danger:disabled {\n    color: #d9534f;\n    background-color: transparent; }\n  .btn-outline-danger:active, .btn-outline-danger.active,\n  .show > .btn-outline-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f; }\n\n.btn-link {\n  font-weight: normal;\n  color: #0275d8;\n  border-radius: 0; }\n  .btn-link, .btn-link:active, .btn-link.active, .btn-link:disabled {\n    background-color: transparent; }\n  .btn-link, .btn-link:focus, .btn-link:active {\n    border-color: transparent; }\n  .btn-link:hover {\n    border-color: transparent; }\n  .btn-link:focus, .btn-link:hover {\n    color: #014c8c;\n    text-decoration: underline;\n    background-color: transparent; }\n  .btn-link:disabled {\n    color: #636c72; }\n    .btn-link:disabled:focus, .btn-link:disabled:hover {\n      text-decoration: none; }\n\n.btn-lg, .btn-group-lg > .btn, .btn-group-lg > button {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\n.btn-sm, .btn-group-sm > .btn, .btn-group-sm > button, button {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\n.btn-block {\n  display: block;\n  width: 100%; }\n\n.btn-block + .btn-block {\n  margin-top: 0.5rem; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.fade {\n  opacity: 0;\n  transition: opacity 0.15s linear; }\n  .fade.show {\n    opacity: 1; }\n\n.collapse {\n  display: none; }\n  .collapse.show {\n    display: block; }\n\ntr.collapse.show {\n  display: table-row; }\n\ntbody.collapse.show {\n  display: table-row-group; }\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  transition: height 0.35s ease; }\n\n.dropup,\n.dropdown {\n  position: relative; }\n\n.dropdown-toggle::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.3em;\n  vertical-align: middle;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-left: 0.3em solid transparent; }\n\n.dropdown-toggle:focus {\n  outline: 0; }\n\n.dropup .dropdown-toggle::after {\n  border-top: 0;\n  border-bottom: 0.3em solid; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #292b2c;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n\n.dropdown-divider {\n  height: 1px;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  background-color: #eceeef; }\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 3px 1.5rem;\n  clear: both;\n  font-weight: normal;\n  color: #292b2c;\n  text-align: inherit;\n  white-space: nowrap;\n  background: none;\n  border: 0; }\n  .dropdown-item:focus, .dropdown-item:hover {\n    color: #1d1e1f;\n    text-decoration: none;\n    background-color: #f7f7f9; }\n  .dropdown-item.active, .dropdown-item:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #0275d8; }\n  .dropdown-item.disabled, .dropdown-item:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: transparent; }\n\n.show > .dropdown-menu {\n  display: block; }\n\n.show > a {\n  outline: 0; }\n\n.dropdown-menu-right {\n  right: 0;\n  left: auto; }\n\n.dropdown-menu-left {\n  right: auto;\n  left: 0; }\n\n.dropdown-header {\n  display: block;\n  padding: 0.5rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #636c72;\n  white-space: nowrap; }\n\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 990; }\n\n.dropup .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 0.125rem; }\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  vertical-align: middle; }\n  .btn-group > .btn, .btn-group > button,\n  .btn-group-vertical > .btn,\n  .btn-group-vertical > button {\n    position: relative;\n    -webkit-box-flex: 0;\n        -ms-flex: 0 1 auto;\n            flex: 0 1 auto; }\n    .btn-group > .btn:hover, .btn-group > button:hover,\n    .btn-group-vertical > .btn:hover,\n    .btn-group-vertical > button:hover {\n      z-index: 2; }\n    .btn-group > .btn:focus, .btn-group > button:focus, .btn-group > .btn:active, .btn-group > button:active, .btn-group > .btn.active, .btn-group > button.active,\n    .btn-group-vertical > .btn:focus,\n    .btn-group-vertical > button:focus,\n    .btn-group-vertical > .btn:active,\n    .btn-group-vertical > button:active,\n    .btn-group-vertical > .btn.active,\n    .btn-group-vertical > button.active {\n      z-index: 2; }\n  .btn-group .btn + .btn, .btn-group button + .btn, .btn-group .btn + button, .btn-group button + button,\n  .btn-group .btn + .btn-group,\n  .btn-group button + .btn-group,\n  .btn-group .btn-group + .btn,\n  .btn-group .btn-group + button,\n  .btn-group .btn-group + .btn-group,\n  .btn-group-vertical .btn + .btn,\n  .btn-group-vertical button + .btn,\n  .btn-group-vertical .btn + button,\n  .btn-group-vertical button + button,\n  .btn-group-vertical .btn + .btn-group,\n  .btn-group-vertical button + .btn-group,\n  .btn-group-vertical .btn-group + .btn,\n  .btn-group-vertical .btn-group + button,\n  .btn-group-vertical .btn-group + .btn-group {\n    margin-left: -1px; }\n\n.btn-toolbar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start; }\n  .btn-toolbar .input-group {\n    width: auto; }\n\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle), .btn-group > button:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0; }\n\n.btn-group > .btn:first-child, .btn-group > button:first-child {\n  margin-left: 0; }\n  .btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle), .btn-group > button:first-child:not(:last-child):not(.dropdown-toggle) {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0; }\n\n.btn-group > .btn:last-child:not(:first-child), .btn-group > button:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group > .btn-group {\n  float: left; }\n\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn, .btn-group > .btn-group:not(:first-child):not(:last-child) > button {\n  border-radius: 0; }\n\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child, .btn-group > .btn-group:first-child:not(:last-child) > button:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child, .btn-group > .btn-group:last-child:not(:first-child) > button:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0; }\n\n.btn + .dropdown-toggle-split, button + .dropdown-toggle-split {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem; }\n  .btn + .dropdown-toggle-split::after, button + .dropdown-toggle-split::after {\n    margin-left: 0; }\n\n.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split, .btn-group-sm > button + .dropdown-toggle-split, button + .dropdown-toggle-split {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem; }\n\n.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split, .btn-group-lg > button + .dropdown-toggle-split {\n  padding-right: 1.125rem;\n  padding-left: 1.125rem; }\n\n.btn-group-vertical {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  .btn-group-vertical .btn, .btn-group-vertical button,\n  .btn-group-vertical .btn-group {\n    width: 100%; }\n  .btn-group-vertical > .btn + .btn, .btn-group-vertical > button + .btn, .btn-group-vertical > .btn + button, .btn-group-vertical > button + button,\n  .btn-group-vertical > .btn + .btn-group,\n  .btn-group-vertical > button + .btn-group,\n  .btn-group-vertical > .btn-group + .btn,\n  .btn-group-vertical > .btn-group + button,\n  .btn-group-vertical > .btn-group + .btn-group {\n    margin-top: -1px;\n    margin-left: 0; }\n\n.btn-group-vertical > .btn:not(:first-child):not(:last-child), .btn-group-vertical > button:not(:first-child):not(:last-child) {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn:first-child:not(:last-child), .btn-group-vertical > button:first-child:not(:last-child) {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn:last-child:not(:first-child), .btn-group-vertical > button:last-child:not(:first-child) {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn, .btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > button {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child, .btn-group-vertical > .btn-group:first-child:not(:last-child) > button:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child, .btn-group-vertical > .btn-group:last-child:not(:first-child) > button:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"], [data-toggle=\"buttons\"] > button input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > button input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > button input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > button input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none; }\n\n.input-group {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%; }\n  .input-group .form-control, .input-group input, .input-group textarea, .input-group select {\n    position: relative;\n    z-index: 2;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    width: 1%;\n    margin-bottom: 0; }\n    .input-group .form-control:focus, .input-group input:focus, .input-group textarea:focus, .input-group select:focus, .input-group .form-control:active, .input-group input:active, .input-group textarea:active, .input-group select:active, .input-group .form-control:hover, .input-group input:hover, .input-group textarea:hover, .input-group select:hover {\n      z-index: 3; }\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control,\n.input-group input,\n.input-group textarea,\n.input-group select {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  .input-group-addon:not(:first-child):not(:last-child),\n  .input-group-btn:not(:first-child):not(:last-child),\n  .input-group .form-control:not(:first-child):not(:last-child),\n  .input-group input:not(:first-child):not(:last-child),\n  .input-group textarea:not(:first-child):not(:last-child),\n  .input-group select:not(:first-child):not(:last-child) {\n    border-radius: 0; }\n\n.input-group-addon,\n.input-group-btn {\n  white-space: nowrap;\n  vertical-align: middle; }\n\n.input-group-addon {\n  padding: 0.5rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.25;\n  color: #464a4c;\n  text-align: center;\n  background-color: #eceeef;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n  .input-group-addon.form-control-sm,\n  .input-group-sm > .input-group-addon,\n  .input-group-sm > .input-group-btn > .input-group-addon.btn,\n  .input-group-sm > .input-group-btn > button.input-group-addon, input.input-group-addon, textarea.input-group-addon, select.input-group-addon {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.875rem;\n    border-radius: 0.2rem; }\n  .input-group-addon.form-control-lg,\n  .input-group-lg > .input-group-addon,\n  .input-group-lg > .input-group-btn > .input-group-addon.btn,\n  .input-group-lg > .input-group-btn > button.input-group-addon {\n    padding: 0.75rem 1.5rem;\n    font-size: 1.25rem;\n    border-radius: 0.3rem; }\n  .input-group-addon input[type=\"radio\"],\n  .input-group-addon input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.input-group .form-control:not(:last-child), .input-group input:not(:last-child), .input-group textarea:not(:last-child), .input-group select:not(:last-child),\n.input-group-addon:not(:last-child),\n.input-group-btn:not(:last-child) > .btn,\n.input-group-btn:not(:last-child) > button,\n.input-group-btn:not(:last-child) > .btn-group > .btn,\n.input-group-btn:not(:last-child) > .btn-group > button,\n.input-group-btn:not(:last-child) > .dropdown-toggle,\n.input-group-btn:not(:first-child) > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:not(:first-child) > button:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:not(:first-child) > .btn-group:not(:last-child) > .btn,\n.input-group-btn:not(:first-child) > .btn-group:not(:last-child) > button {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.input-group-addon:not(:last-child) {\n  border-right: 0; }\n\n.input-group .form-control:not(:first-child), .input-group input:not(:first-child), .input-group textarea:not(:first-child), .input-group select:not(:first-child),\n.input-group-addon:not(:first-child),\n.input-group-btn:not(:first-child) > .btn,\n.input-group-btn:not(:first-child) > button,\n.input-group-btn:not(:first-child) > .btn-group > .btn,\n.input-group-btn:not(:first-child) > .btn-group > button,\n.input-group-btn:not(:first-child) > .dropdown-toggle,\n.input-group-btn:not(:last-child) > .btn:not(:first-child),\n.input-group-btn:not(:last-child) > button:not(:first-child),\n.input-group-btn:not(:last-child) > .btn-group:not(:first-child) > .btn,\n.input-group-btn:not(:last-child) > .btn-group:not(:first-child) > button {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.form-control + .input-group-addon:not(:first-child), input + .input-group-addon:not(:first-child), textarea + .input-group-addon:not(:first-child), select + .input-group-addon:not(:first-child) {\n  border-left: 0; }\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap; }\n  .input-group-btn > .btn, .input-group-btn > button {\n    position: relative;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1; }\n    .input-group-btn > .btn + .btn, .input-group-btn > button + .btn, .input-group-btn > .btn + button, .input-group-btn > button + button {\n      margin-left: -1px; }\n    .input-group-btn > .btn:focus, .input-group-btn > button:focus, .input-group-btn > .btn:active, .input-group-btn > button:active, .input-group-btn > .btn:hover, .input-group-btn > button:hover {\n      z-index: 3; }\n  .input-group-btn:not(:last-child) > .btn, .input-group-btn:not(:last-child) > button,\n  .input-group-btn:not(:last-child) > .btn-group {\n    margin-right: -1px; }\n  .input-group-btn:not(:first-child) > .btn, .input-group-btn:not(:first-child) > button,\n  .input-group-btn:not(:first-child) > .btn-group {\n    z-index: 2;\n    margin-left: -1px; }\n    .input-group-btn:not(:first-child) > .btn:focus, .input-group-btn:not(:first-child) > button:focus, .input-group-btn:not(:first-child) > .btn:active, .input-group-btn:not(:first-child) > button:active, .input-group-btn:not(:first-child) > .btn:hover, .input-group-btn:not(:first-child) > button:hover,\n    .input-group-btn:not(:first-child) > .btn-group:focus,\n    .input-group-btn:not(:first-child) > .btn-group:active,\n    .input-group-btn:not(:first-child) > .btn-group:hover {\n      z-index: 3; }\n\n.custom-control {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  min-height: 1.5rem;\n  padding-left: 1.5rem;\n  margin-right: 1rem;\n  cursor: pointer; }\n\n.custom-control-input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0; }\n  .custom-control-input:checked ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #0275d8; }\n  .custom-control-input:focus ~ .custom-control-indicator {\n    box-shadow: 0 0 0 1px #fff, 0 0 0 3px #0275d8; }\n  .custom-control-input:active ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #8fcafe; }\n  .custom-control-input:disabled ~ .custom-control-indicator {\n    cursor: not-allowed;\n    background-color: #eceeef; }\n  .custom-control-input:disabled ~ .custom-control-description {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.custom-control-indicator {\n  position: absolute;\n  top: 0.25rem;\n  left: 0;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: #ddd;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: 50% 50%; }\n\n.custom-checkbox .custom-control-indicator {\n  border-radius: 0.25rem; }\n\n.custom-checkbox .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E\"); }\n\n.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-indicator {\n  background-color: #0275d8;\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='%23fff' d='M0 2h4'/%3E%3C/svg%3E\"); }\n\n.custom-radio .custom-control-indicator {\n  border-radius: 50%; }\n\n.custom-radio .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E\"); }\n\n.custom-controls-stacked {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n  .custom-controls-stacked .custom-control {\n    margin-bottom: 0.25rem; }\n    .custom-controls-stacked .custom-control + .custom-control {\n      margin-left: 0; }\n\n.custom-select {\n  display: inline-block;\n  max-width: 100%;\n  height: calc(2.25rem + 2px);\n  padding: 0.375rem 1.75rem 0.375rem 0.75rem;\n  line-height: 1.25;\n  color: #464a4c;\n  vertical-align: middle;\n  background: #fff url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23333' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\") no-repeat right 0.75rem center;\n  background-size: 8px 10px;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  -moz-appearance: none;\n  -webkit-appearance: none; }\n  .custom-select:focus {\n    border-color: #5cb3fd;\n    outline: none; }\n    .custom-select:focus::-ms-value {\n      color: #464a4c;\n      background-color: #fff; }\n  .custom-select:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: #eceeef; }\n  .custom-select::-ms-expand {\n    opacity: 0; }\n\n.custom-select-sm {\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  font-size: 75%; }\n\n.custom-file {\n  position: relative;\n  display: inline-block;\n  max-width: 100%;\n  height: 2.5rem;\n  margin-bottom: 0;\n  cursor: pointer; }\n\n.custom-file-input {\n  min-width: 14rem;\n  max-width: 100%;\n  height: 2.5rem;\n  margin: 0;\n  filter: alpha(opacity=0);\n  opacity: 0; }\n\n.custom-file-control {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 5;\n  height: 2.5rem;\n  padding: 0.5rem 1rem;\n  line-height: 1.5;\n  color: #464a4c;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n  .custom-file-control:lang(en)::after {\n    content: \"Choose file...\"; }\n  .custom-file-control::before {\n    position: absolute;\n    top: -1px;\n    right: -1px;\n    bottom: -1px;\n    z-index: 6;\n    display: block;\n    height: 2.5rem;\n    padding: 0.5rem 1rem;\n    line-height: 1.5;\n    color: #464a4c;\n    background-color: #eceeef;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-radius: 0 0.25rem 0.25rem 0; }\n  .custom-file-control:lang(en)::before {\n    content: \"Browse\"; }\n\n.nav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n\n.nav-link {\n  display: block;\n  padding: 0.5em 1em; }\n  .nav-link:focus, .nav-link:hover {\n    text-decoration: none; }\n  .nav-link.disabled {\n    color: #636c72;\n    cursor: not-allowed; }\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd; }\n  .nav-tabs .nav-item {\n    margin-bottom: -1px; }\n  .nav-tabs .nav-link {\n    border: 1px solid transparent;\n    border-top-right-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n    .nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {\n      border-color: #eceeef #eceeef #ddd; }\n    .nav-tabs .nav-link.disabled {\n      color: #636c72;\n      background-color: transparent;\n      border-color: transparent; }\n  .nav-tabs .nav-link.active,\n  .nav-tabs .nav-item.show .nav-link {\n    color: #464a4c;\n    background-color: #fff;\n    border-color: #ddd #ddd #fff; }\n  .nav-tabs .dropdown-menu {\n    margin-top: -1px;\n    border-top-right-radius: 0;\n    border-top-left-radius: 0; }\n\n.nav-pills .nav-link {\n  border-radius: 0.25rem; }\n\n.nav-pills .nav-link.active,\n.nav-pills .nav-item.show .nav-link {\n  color: #fff;\n  cursor: default;\n  background-color: #0275d8; }\n\n.nav-fill .nav-item {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  text-align: center; }\n\n.nav-justified .nav-item {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 100%;\n          flex: 1 1 100%;\n  text-align: center; }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.navbar {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 0.5rem 1rem; }\n\n.navbar-brand {\n  display: inline-block;\n  padding-top: .25rem;\n  padding-bottom: .25rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  line-height: inherit;\n  white-space: nowrap; }\n  .navbar-brand:focus, .navbar-brand:hover {\n    text-decoration: none; }\n\n.navbar-nav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n  .navbar-nav .nav-link {\n    padding-right: 0;\n    padding-left: 0; }\n\n.navbar-text {\n  display: inline-block;\n  padding-top: .425rem;\n  padding-bottom: .425rem; }\n\n.navbar-toggler {\n  -ms-flex-item-align: start;\n      align-self: flex-start;\n  padding: 0.25rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n  .navbar-toggler:focus, .navbar-toggler:hover {\n    text-decoration: none; }\n\n.navbar-toggler-icon {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  content: \"\";\n  background: no-repeat center center;\n  background-size: 100% 100%; }\n\n.navbar-toggler-left {\n  position: absolute;\n  left: 1rem; }\n\n.navbar-toggler-right {\n  position: absolute;\n  right: 1rem; }\n\n@media (max-width: 575px) {\n  .navbar-toggleable .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 576px) {\n  .navbar-toggleable {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 767px) {\n  .navbar-toggleable-sm .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-sm > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 768px) {\n  .navbar-toggleable-sm {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable-sm .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable-sm .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-sm > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable-sm .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-sm .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 991px) {\n  .navbar-toggleable-md .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-md > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 992px) {\n  .navbar-toggleable-md {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable-md .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable-md .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-md > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable-md .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-md .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 1199px) {\n  .navbar-toggleable-lg .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-lg > .container {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 1200px) {\n  .navbar-toggleable-lg {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .navbar-toggleable-lg .navbar-nav {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      .navbar-toggleable-lg .navbar-nav .nav-link {\n        padding-right: .5rem;\n        padding-left: .5rem; }\n    .navbar-toggleable-lg > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .navbar-toggleable-lg .navbar-collapse {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      width: 100%; }\n    .navbar-toggleable-lg .navbar-toggler {\n      display: none; } }\n\n.navbar-toggleable-xl {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .navbar-toggleable-xl .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n  .navbar-toggleable-xl > .container {\n    padding-right: 0;\n    padding-left: 0; }\n  .navbar-toggleable-xl .navbar-nav {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n    .navbar-toggleable-xl .navbar-nav .nav-link {\n      padding-right: .5rem;\n      padding-left: .5rem; }\n  .navbar-toggleable-xl > .container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .navbar-toggleable-xl .navbar-collapse {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    width: 100%; }\n  .navbar-toggleable-xl .navbar-toggler {\n    display: none; }\n\n.navbar-light .navbar-brand,\n.navbar-light .navbar-toggler {\n  color: rgba(0, 0, 0, 0.9); }\n  .navbar-light .navbar-brand:focus, .navbar-light .navbar-brand:hover,\n  .navbar-light .navbar-toggler:focus,\n  .navbar-light .navbar-toggler:hover {\n    color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.5); }\n  .navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover {\n    color: rgba(0, 0, 0, 0.7); }\n  .navbar-light .navbar-nav .nav-link.disabled {\n    color: rgba(0, 0, 0, 0.3); }\n\n.navbar-light .navbar-nav .open > .nav-link,\n.navbar-light .navbar-nav .active > .nav-link,\n.navbar-light .navbar-nav .nav-link.open,\n.navbar-light .navbar-nav .nav-link.active {\n  color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-toggler {\n  border-color: rgba(0, 0, 0, 0.1); }\n\n.navbar-light .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\"); }\n\n.navbar-light .navbar-text {\n  color: rgba(0, 0, 0, 0.5); }\n\n.navbar-inverse .navbar-brand,\n.navbar-inverse .navbar-toggler {\n  color: white; }\n  .navbar-inverse .navbar-brand:focus, .navbar-inverse .navbar-brand:hover,\n  .navbar-inverse .navbar-toggler:focus,\n  .navbar-inverse .navbar-toggler:hover {\n    color: white; }\n\n.navbar-inverse .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.5); }\n  .navbar-inverse .navbar-nav .nav-link:focus, .navbar-inverse .navbar-nav .nav-link:hover {\n    color: rgba(255, 255, 255, 0.75); }\n  .navbar-inverse .navbar-nav .nav-link.disabled {\n    color: rgba(255, 255, 255, 0.25); }\n\n.navbar-inverse .navbar-nav .open > .nav-link,\n.navbar-inverse .navbar-nav .active > .nav-link,\n.navbar-inverse .navbar-nav .nav-link.open,\n.navbar-inverse .navbar-nav .nav-link.active {\n  color: white; }\n\n.navbar-inverse .navbar-toggler {\n  border-color: rgba(255, 255, 255, 0.1); }\n\n.navbar-inverse .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\"); }\n\n.navbar-inverse .navbar-text {\n  color: rgba(255, 255, 255, 0.5); }\n\n.card {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.25rem; }\n\n.card-block {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  padding: 1.25rem; }\n\n.card-title {\n  margin-bottom: 0.75rem; }\n\n.card-subtitle {\n  margin-top: -0.375rem;\n  margin-bottom: 0; }\n\n.card-text:last-child {\n  margin-bottom: 0; }\n\n.card-link:hover {\n  text-decoration: none; }\n\n.card-link + .card-link {\n  margin-left: 1.25rem; }\n\n.card > .list-group:first-child .list-group-item:first-child {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.card > .list-group:last-child .list-group-item:last-child {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.card-header {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #f7f7f9;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-header:first-child {\n    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0; }\n\n.card-footer {\n  padding: 0.75rem 1.25rem;\n  background-color: #f7f7f9;\n  border-top: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-footer:last-child {\n    border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px); }\n\n.card-header-tabs {\n  margin-right: -0.625rem;\n  margin-bottom: -0.75rem;\n  margin-left: -0.625rem;\n  border-bottom: 0; }\n\n.card-header-pills {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem; }\n\n.card-primary {\n  background-color: #0275d8;\n  border-color: #0275d8; }\n  .card-primary .card-header,\n  .card-primary .card-footer {\n    background-color: transparent; }\n\n.card-success {\n  background-color: #5cb85c;\n  border-color: #5cb85c; }\n  .card-success .card-header,\n  .card-success .card-footer {\n    background-color: transparent; }\n\n.card-info {\n  background-color: #5bc0de;\n  border-color: #5bc0de; }\n  .card-info .card-header,\n  .card-info .card-footer {\n    background-color: transparent; }\n\n.card-warning {\n  background-color: #f0ad4e;\n  border-color: #f0ad4e; }\n  .card-warning .card-header,\n  .card-warning .card-footer {\n    background-color: transparent; }\n\n.card-danger {\n  background-color: #d9534f;\n  border-color: #d9534f; }\n  .card-danger .card-header,\n  .card-danger .card-footer {\n    background-color: transparent; }\n\n.card-outline-primary {\n  background-color: transparent;\n  border-color: #0275d8; }\n\n.card-outline-secondary {\n  background-color: transparent;\n  border-color: #ccc; }\n\n.card-outline-info {\n  background-color: transparent;\n  border-color: #5bc0de; }\n\n.card-outline-success {\n  background-color: transparent;\n  border-color: #5cb85c; }\n\n.card-outline-warning {\n  background-color: transparent;\n  border-color: #f0ad4e; }\n\n.card-outline-danger {\n  background-color: transparent;\n  border-color: #d9534f; }\n\n.card-inverse {\n  color: rgba(255, 255, 255, 0.65); }\n  .card-inverse .card-header,\n  .card-inverse .card-footer {\n    background-color: transparent;\n    border-color: rgba(255, 255, 255, 0.2); }\n  .card-inverse .card-header,\n  .card-inverse .card-footer,\n  .card-inverse .card-title,\n  .card-inverse .card-blockquote {\n    color: #fff; }\n  .card-inverse .card-link,\n  .card-inverse .card-text,\n  .card-inverse .card-subtitle,\n  .card-inverse .card-blockquote .blockquote-footer {\n    color: rgba(255, 255, 255, 0.65); }\n  .card-inverse .card-link:focus, .card-inverse .card-link:hover {\n    color: #fff; }\n\n.card-blockquote {\n  padding: 0;\n  margin-bottom: 0;\n  border-left: 0; }\n\n.card-img {\n  border-radius: calc(0.25rem - 1px); }\n\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem; }\n\n.card-img-top {\n  border-top-right-radius: calc(0.25rem - 1px);\n  border-top-left-radius: calc(0.25rem - 1px); }\n\n.card-img-bottom {\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px); }\n\n@media (min-width: 576px) {\n  .card-deck {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap; }\n    .card-deck .card {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-flex: 1;\n          -ms-flex: 1 0 0px;\n              flex: 1 0 0;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column; }\n      .card-deck .card:not(:first-child) {\n        margin-left: 15px; }\n      .card-deck .card:not(:last-child) {\n        margin-right: 15px; } }\n\n@media (min-width: 576px) {\n  .card-group {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap; }\n    .card-group .card {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 0 0px;\n              flex: 1 0 0; }\n      .card-group .card + .card {\n        margin-left: 0;\n        border-left: 0; }\n      .card-group .card:first-child {\n        border-bottom-right-radius: 0;\n        border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-top {\n          border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-bottom {\n          border-bottom-right-radius: 0; }\n      .card-group .card:last-child {\n        border-bottom-left-radius: 0;\n        border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-top {\n          border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-bottom {\n          border-bottom-left-radius: 0; }\n      .card-group .card:not(:first-child):not(:last-child) {\n        border-radius: 0; }\n        .card-group .card:not(:first-child):not(:last-child) .card-img-top,\n        .card-group .card:not(:first-child):not(:last-child) .card-img-bottom {\n          border-radius: 0; } }\n\n@media (min-width: 576px) {\n  .card-columns {\n    -webkit-column-count: 3;\n            column-count: 3;\n    -webkit-column-gap: 1.25rem;\n            column-gap: 1.25rem; }\n    .card-columns .card {\n      display: inline-block;\n      width: 100%;\n      margin-bottom: 0.75rem; } }\n\n.breadcrumb {\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: #eceeef;\n  border-radius: 0.25rem; }\n  .breadcrumb::after {\n    display: block;\n    content: \"\";\n    clear: both; }\n\n.breadcrumb-item {\n  float: left; }\n  .breadcrumb-item + .breadcrumb-item::before {\n    display: inline-block;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    color: #636c72;\n    content: \"/\"; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: underline; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: none; }\n  .breadcrumb-item.active {\n    color: #636c72; }\n\n.pagination {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding-left: 0;\n  list-style: none;\n  border-radius: 0.25rem; }\n\n.page-item:first-child .page-link {\n  margin-left: 0;\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.page-item:last-child .page-link {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.page-item.active .page-link {\n  z-index: 2;\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8; }\n\n.page-item.disabled .page-link {\n  color: #636c72;\n  pointer-events: none;\n  cursor: not-allowed;\n  background-color: #fff;\n  border-color: #ddd; }\n\n.page-link {\n  position: relative;\n  display: block;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  line-height: 1.25;\n  color: #0275d8;\n  background-color: #fff;\n  border: 1px solid #ddd; }\n  .page-link:focus, .page-link:hover {\n    color: #014c8c;\n    text-decoration: none;\n    background-color: #eceeef;\n    border-color: #ddd; }\n\n.pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem; }\n\n.pagination-lg .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.3rem;\n  border-top-left-radius: 0.3rem; }\n\n.pagination-lg .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.3rem;\n  border-top-right-radius: 0.3rem; }\n\n.pagination-sm .page-link {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem; }\n\n.pagination-sm .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.2rem;\n  border-top-left-radius: 0.2rem; }\n\n.pagination-sm .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.2rem;\n  border-top-right-radius: 0.2rem; }\n\n.badge {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem; }\n  .badge:empty {\n    display: none; }\n\n.btn .badge, button .badge {\n  position: relative;\n  top: -1px; }\n\na.badge:focus, a.badge:hover {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.badge-pill {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem; }\n\n.badge-default {\n  background-color: #636c72; }\n  .badge-default[href]:focus, .badge-default[href]:hover {\n    background-color: #4b5257; }\n\n.badge-primary {\n  background-color: #0275d8; }\n  .badge-primary[href]:focus, .badge-primary[href]:hover {\n    background-color: #025aa5; }\n\n.badge-success {\n  background-color: #5cb85c; }\n  .badge-success[href]:focus, .badge-success[href]:hover {\n    background-color: #449d44; }\n\n.badge-info {\n  background-color: #5bc0de; }\n  .badge-info[href]:focus, .badge-info[href]:hover {\n    background-color: #31b0d5; }\n\n.badge-warning {\n  background-color: #f0ad4e; }\n  .badge-warning[href]:focus, .badge-warning[href]:hover {\n    background-color: #ec971f; }\n\n.badge-danger {\n  background-color: #d9534f; }\n  .badge-danger[href]:focus, .badge-danger[href]:hover {\n    background-color: #c9302c; }\n\n.jumbotron {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #eceeef;\n  border-radius: 0.3rem; }\n  @media (min-width: 576px) {\n    .jumbotron {\n      padding: 4rem 2rem; } }\n\n.jumbotron-hr {\n  border-top-color: #d0d5d8; }\n\n.jumbotron-fluid {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0; }\n\n.alert {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n\n.alert-heading {\n  color: inherit; }\n\n.alert-link {\n  font-weight: bold; }\n\n.alert-dismissible .close {\n  position: relative;\n  top: -0.75rem;\n  right: -1.25rem;\n  padding: 0.75rem 1.25rem;\n  color: inherit; }\n\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d0e9c6;\n  color: #3c763d; }\n  .alert-success hr {\n    border-top-color: #c1e2b3; }\n  .alert-success .alert-link {\n    color: #2b542c; }\n\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bcdff1;\n  color: #31708f; }\n  .alert-info hr {\n    border-top-color: #a6d5ec; }\n  .alert-info .alert-link {\n    color: #245269; }\n\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #faf2cc;\n  color: #8a6d3b; }\n  .alert-warning hr {\n    border-top-color: #f7ecb5; }\n  .alert-warning .alert-link {\n    color: #66512c; }\n\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #ebcccc;\n  color: #a94442; }\n  .alert-danger hr {\n    border-top-color: #e4b9b9; }\n  .alert-danger .alert-link {\n    color: #843534; }\n\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n.progress {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  overflow: hidden;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  text-align: center;\n  background-color: #eceeef;\n  border-radius: 0.25rem; }\n\n.progress-bar {\n  height: 1rem;\n  color: #fff;\n  background-color: #0275d8; }\n\n.progress-bar-striped {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n.progress-bar-animated {\n  -webkit-animation: progress-bar-stripes 1s linear infinite;\n          animation: progress-bar-stripes 1s linear infinite; }\n\n.media {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start; }\n\n.media-body {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1; }\n\n.list-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0; }\n\n.list-group-item-action {\n  width: 100%;\n  color: #464a4c;\n  text-align: inherit; }\n  .list-group-item-action .list-group-item-heading {\n    color: #292b2c; }\n  .list-group-item-action:focus, .list-group-item-action:hover {\n    color: #464a4c;\n    text-decoration: none;\n    background-color: #f7f7f9; }\n  .list-group-item-action:active {\n    color: #292b2c;\n    background-color: #eceeef; }\n\n.list-group-item {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125); }\n  .list-group-item:first-child {\n    border-top-right-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n  .list-group-item:last-child {\n    margin-bottom: 0;\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n  .list-group-item:focus, .list-group-item:hover {\n    text-decoration: none; }\n  .list-group-item.disabled, .list-group-item:disabled {\n    color: #636c72;\n    cursor: not-allowed;\n    background-color: #fff; }\n    .list-group-item.disabled .list-group-item-heading, .list-group-item:disabled .list-group-item-heading {\n      color: inherit; }\n    .list-group-item.disabled .list-group-item-text, .list-group-item:disabled .list-group-item-text {\n      color: #636c72; }\n  .list-group-item.active {\n    z-index: 2;\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n    .list-group-item.active .list-group-item-heading,\n    .list-group-item.active .list-group-item-heading > small,\n    .list-group-item.active .list-group-item-heading > .small {\n      color: inherit; }\n    .list-group-item.active .list-group-item-text {\n      color: #daeeff; }\n\n.list-group-flush .list-group-item {\n  border-right: 0;\n  border-left: 0;\n  border-radius: 0; }\n\n.list-group-flush:first-child .list-group-item:first-child {\n  border-top: 0; }\n\n.list-group-flush:last-child .list-group-item:last-child {\n  border-bottom: 0; }\n\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8; }\n\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d; }\n  a.list-group-item-success .list-group-item-heading,\n  button.list-group-item-success .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-success:focus, a.list-group-item-success:hover,\n  button.list-group-item-success:focus,\n  button.list-group-item-success:hover {\n    color: #3c763d;\n    background-color: #d0e9c6; }\n  a.list-group-item-success.active,\n  button.list-group-item-success.active {\n    color: #fff;\n    background-color: #3c763d;\n    border-color: #3c763d; }\n\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7; }\n\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f; }\n  a.list-group-item-info .list-group-item-heading,\n  button.list-group-item-info .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-info:focus, a.list-group-item-info:hover,\n  button.list-group-item-info:focus,\n  button.list-group-item-info:hover {\n    color: #31708f;\n    background-color: #c4e3f3; }\n  a.list-group-item-info.active,\n  button.list-group-item-info.active {\n    color: #fff;\n    background-color: #31708f;\n    border-color: #31708f; }\n\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3; }\n\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b; }\n  a.list-group-item-warning .list-group-item-heading,\n  button.list-group-item-warning .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-warning:focus, a.list-group-item-warning:hover,\n  button.list-group-item-warning:focus,\n  button.list-group-item-warning:hover {\n    color: #8a6d3b;\n    background-color: #faf2cc; }\n  a.list-group-item-warning.active,\n  button.list-group-item-warning.active {\n    color: #fff;\n    background-color: #8a6d3b;\n    border-color: #8a6d3b; }\n\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede; }\n\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442; }\n  a.list-group-item-danger .list-group-item-heading,\n  button.list-group-item-danger .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-danger:focus, a.list-group-item-danger:hover,\n  button.list-group-item-danger:focus,\n  button.list-group-item-danger:hover {\n    color: #a94442;\n    background-color: #ebcccc; }\n  a.list-group-item-danger.active,\n  button.list-group-item-danger.active {\n    color: #fff;\n    background-color: #a94442;\n    border-color: #a94442; }\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 0;\n  overflow: hidden; }\n  .embed-responsive::before {\n    display: block;\n    content: \"\"; }\n  .embed-responsive .embed-responsive-item,\n  .embed-responsive iframe,\n  .embed-responsive embed,\n  .embed-responsive object,\n  .embed-responsive video {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0; }\n\n.embed-responsive-21by9::before {\n  padding-top: 42.85714%; }\n\n.embed-responsive-16by9::before {\n  padding-top: 56.25%; }\n\n.embed-responsive-4by3::before {\n  padding-top: 75%; }\n\n.embed-responsive-1by1::before {\n  padding-top: 100%; }\n\n.close {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: .5; }\n  .close:focus, .close:hover {\n    color: #000;\n    text-decoration: none;\n    cursor: pointer;\n    opacity: .75; }\n\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none; }\n\n.modal-open {\n  overflow: hidden; }\n\n.modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  outline: 0; }\n  .modal.fade .modal-dialog {\n    transition: -webkit-transform 0.3s ease-out;\n    transition: transform 0.3s ease-out;\n    transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;\n    -webkit-transform: translate(0, -25%);\n            transform: translate(0, -25%); }\n  .modal.show .modal-dialog {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0); }\n\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto; }\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px; }\n\n.modal-content {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0; }\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000; }\n  .modal-backdrop.fade {\n    opacity: 0; }\n  .modal-backdrop.show {\n    opacity: 0.5; }\n\n.modal-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 15px;\n  border-bottom: 1px solid #eceeef; }\n\n.modal-title {\n  margin-bottom: 0;\n  line-height: 1.5; }\n\n.modal-body {\n  position: relative;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  padding: 15px; }\n\n.modal-footer {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  padding: 15px;\n  border-top: 1px solid #eceeef; }\n  .modal-footer > :not(:first-child) {\n    margin-left: .25rem; }\n  .modal-footer > :not(:last-child) {\n    margin-right: .25rem; }\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll; }\n\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 500px;\n    margin: 30px auto; }\n  .modal-sm {\n    max-width: 300px; } }\n\n@media (min-width: 992px) {\n  .modal-lg {\n    max-width: 800px; } }\n\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0; }\n  .tooltip.show {\n    opacity: 0.9; }\n  .tooltip.tooltip-top, .tooltip.bs-tether-element-attached-bottom {\n    padding: 5px 0;\n    margin-top: -3px; }\n    .tooltip.tooltip-top .tooltip-inner::before, .tooltip.bs-tether-element-attached-bottom .tooltip-inner::before {\n      bottom: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: \"\";\n      border-width: 5px 5px 0;\n      border-top-color: #000; }\n  .tooltip.tooltip-right, .tooltip.bs-tether-element-attached-left {\n    padding: 0 5px;\n    margin-left: 3px; }\n    .tooltip.tooltip-right .tooltip-inner::before, .tooltip.bs-tether-element-attached-left .tooltip-inner::before {\n      top: 50%;\n      left: 0;\n      margin-top: -5px;\n      content: \"\";\n      border-width: 5px 5px 5px 0;\n      border-right-color: #000; }\n  .tooltip.tooltip-bottom, .tooltip.bs-tether-element-attached-top {\n    padding: 5px 0;\n    margin-top: 3px; }\n    .tooltip.tooltip-bottom .tooltip-inner::before, .tooltip.bs-tether-element-attached-top .tooltip-inner::before {\n      top: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: \"\";\n      border-width: 0 5px 5px;\n      border-bottom-color: #000; }\n  .tooltip.tooltip-left, .tooltip.bs-tether-element-attached-right {\n    padding: 0 5px;\n    margin-left: -3px; }\n    .tooltip.tooltip-left .tooltip-inner::before, .tooltip.bs-tether-element-attached-right .tooltip-inner::before {\n      top: 50%;\n      right: 0;\n      margin-top: -5px;\n      content: \"\";\n      border-width: 5px 0 5px 5px;\n      border-left-color: #000; }\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem; }\n  .tooltip-inner::before {\n    position: absolute;\n    width: 0;\n    height: 0;\n    border-color: transparent;\n    border-style: solid; }\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: block;\n  max-width: 276px;\n  padding: 1px;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem; }\n  .popover.popover-top, .popover.bs-tether-element-attached-bottom {\n    margin-top: -10px; }\n    .popover.popover-top::before, .popover.popover-top::after, .popover.bs-tether-element-attached-bottom::before, .popover.bs-tether-element-attached-bottom::after {\n      left: 50%;\n      border-bottom-width: 0; }\n    .popover.popover-top::before, .popover.bs-tether-element-attached-bottom::before {\n      bottom: -11px;\n      margin-left: -11px;\n      border-top-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-top::after, .popover.bs-tether-element-attached-bottom::after {\n      bottom: -10px;\n      margin-left: -10px;\n      border-top-color: #fff; }\n  .popover.popover-right, .popover.bs-tether-element-attached-left {\n    margin-left: 10px; }\n    .popover.popover-right::before, .popover.popover-right::after, .popover.bs-tether-element-attached-left::before, .popover.bs-tether-element-attached-left::after {\n      top: 50%;\n      border-left-width: 0; }\n    .popover.popover-right::before, .popover.bs-tether-element-attached-left::before {\n      left: -11px;\n      margin-top: -11px;\n      border-right-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-right::after, .popover.bs-tether-element-attached-left::after {\n      left: -10px;\n      margin-top: -10px;\n      border-right-color: #fff; }\n  .popover.popover-bottom, .popover.bs-tether-element-attached-top {\n    margin-top: 10px; }\n    .popover.popover-bottom::before, .popover.popover-bottom::after, .popover.bs-tether-element-attached-top::before, .popover.bs-tether-element-attached-top::after {\n      left: 50%;\n      border-top-width: 0; }\n    .popover.popover-bottom::before, .popover.bs-tether-element-attached-top::before {\n      top: -11px;\n      margin-left: -11px;\n      border-bottom-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-bottom::after, .popover.bs-tether-element-attached-top::after {\n      top: -10px;\n      margin-left: -10px;\n      border-bottom-color: #f7f7f7; }\n    .popover.popover-bottom .popover-title::before, .popover.bs-tether-element-attached-top .popover-title::before {\n      position: absolute;\n      top: 0;\n      left: 50%;\n      display: block;\n      width: 20px;\n      margin-left: -10px;\n      content: \"\";\n      border-bottom: 1px solid #f7f7f7; }\n  .popover.popover-left, .popover.bs-tether-element-attached-right {\n    margin-left: -10px; }\n    .popover.popover-left::before, .popover.popover-left::after, .popover.bs-tether-element-attached-right::before, .popover.bs-tether-element-attached-right::after {\n      top: 50%;\n      border-right-width: 0; }\n    .popover.popover-left::before, .popover.bs-tether-element-attached-right::before {\n      right: -11px;\n      margin-top: -11px;\n      border-left-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-left::after, .popover.bs-tether-element-attached-right::after {\n      right: -10px;\n      margin-top: -10px;\n      border-left-color: #fff; }\n\n.popover-title {\n  padding: 8px 14px;\n  margin-bottom: 0;\n  font-size: 1rem;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-top-right-radius: calc(0.3rem - 1px);\n  border-top-left-radius: calc(0.3rem - 1px); }\n  .popover-title:empty {\n    display: none; }\n\n.popover-content {\n  padding: 9px 14px; }\n\n.popover::before,\n.popover::after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n.popover::before {\n  content: \"\";\n  border-width: 11px; }\n\n.popover::after {\n  content: \"\";\n  border-width: 10px; }\n\n.carousel {\n  position: relative; }\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden; }\n\n.carousel-item {\n  position: relative;\n  display: none;\n  width: 100%; }\n  @media (-webkit-transform-3d) {\n    .carousel-item {\n      transition: -webkit-transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;\n      -webkit-backface-visibility: hidden;\n              backface-visibility: hidden;\n      -webkit-perspective: 1000px;\n              perspective: 1000px; } }\n  @supports ((-webkit-transform: translate3d(0, 0, 0)) or (transform: translate3d(0, 0, 0))) {\n    .carousel-item {\n      transition: -webkit-transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out;\n      transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;\n      -webkit-backface-visibility: hidden;\n              backface-visibility: hidden;\n      -webkit-perspective: 1000px;\n              perspective: 1000px; } }\n\n.carousel-item.active,\n.carousel-item-next,\n.carousel-item-prev {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.carousel-item-next,\n.carousel-item-prev {\n  position: absolute;\n  top: 0; }\n\n@media (-webkit-transform-3d) {\n  .carousel-item-next.carousel-item-left,\n  .carousel-item-prev.carousel-item-right {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n  .carousel-item-next,\n  .active.carousel-item-right {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0); }\n  .carousel-item-prev,\n  .active.carousel-item-left {\n    -webkit-transform: translate3d(-100%, 0, 0);\n            transform: translate3d(-100%, 0, 0); } }\n\n@supports ((-webkit-transform: translate3d(0, 0, 0)) or (transform: translate3d(0, 0, 0))) {\n  .carousel-item-next.carousel-item-left,\n  .carousel-item-prev.carousel-item-right {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n  .carousel-item-next,\n  .active.carousel-item-right {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0); }\n  .carousel-item-prev,\n  .active.carousel-item-left {\n    -webkit-transform: translate3d(-100%, 0, 0);\n            transform: translate3d(-100%, 0, 0); } }\n\n.carousel-control-prev,\n.carousel-control-next {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 15%;\n  color: #fff;\n  text-align: center;\n  opacity: 0.5; }\n  .carousel-control-prev:focus, .carousel-control-prev:hover,\n  .carousel-control-next:focus,\n  .carousel-control-next:hover {\n    color: #fff;\n    text-decoration: none;\n    outline: 0;\n    opacity: .9; }\n\n.carousel-control-prev {\n  left: 0; }\n\n.carousel-control-next {\n  right: 0; }\n\n.carousel-control-prev-icon,\n.carousel-control-next-icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background: transparent no-repeat center center;\n  background-size: 100% 100%; }\n\n.carousel-control-prev-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\"); }\n\n.carousel-control-next-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\"); }\n\n.carousel-indicators {\n  position: absolute;\n  right: 0;\n  bottom: 10px;\n  left: 0;\n  z-index: 15;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding-left: 0;\n  margin-right: 15%;\n  margin-left: 15%;\n  list-style: none; }\n  .carousel-indicators li {\n    position: relative;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 0 auto;\n            flex: 1 0 auto;\n    max-width: 30px;\n    height: 3px;\n    margin-right: 3px;\n    margin-left: 3px;\n    text-indent: -999px;\n    cursor: pointer;\n    background-color: rgba(255, 255, 255, 0.5); }\n    .carousel-indicators li::before {\n      position: absolute;\n      top: -10px;\n      left: 0;\n      display: inline-block;\n      width: 100%;\n      height: 10px;\n      content: \"\"; }\n    .carousel-indicators li::after {\n      position: absolute;\n      bottom: -10px;\n      left: 0;\n      display: inline-block;\n      width: 100%;\n      height: 10px;\n      content: \"\"; }\n  .carousel-indicators .active {\n    background-color: #fff; }\n\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center; }\n\n.align-baseline {\n  vertical-align: baseline !important; }\n\n.align-top {\n  vertical-align: top !important; }\n\n.align-middle {\n  vertical-align: middle !important; }\n\n.align-bottom {\n  vertical-align: bottom !important; }\n\n.align-text-bottom {\n  vertical-align: text-bottom !important; }\n\n.align-text-top {\n  vertical-align: text-top !important; }\n\n.bg-faded {\n  background-color: #f7f7f7; }\n\n.bg-primary {\n  background-color: #0275d8 !important; }\n\na.bg-primary:focus, a.bg-primary:hover {\n  background-color: #025aa5 !important; }\n\n.bg-success {\n  background-color: #5cb85c !important; }\n\na.bg-success:focus, a.bg-success:hover {\n  background-color: #449d44 !important; }\n\n.bg-info {\n  background-color: #5bc0de !important; }\n\na.bg-info:focus, a.bg-info:hover {\n  background-color: #31b0d5 !important; }\n\n.bg-warning {\n  background-color: #f0ad4e !important; }\n\na.bg-warning:focus, a.bg-warning:hover {\n  background-color: #ec971f !important; }\n\n.bg-danger {\n  background-color: #d9534f !important; }\n\na.bg-danger:focus, a.bg-danger:hover {\n  background-color: #c9302c !important; }\n\n.bg-inverse {\n  background-color: #292b2c !important; }\n\na.bg-inverse:focus, a.bg-inverse:hover {\n  background-color: #101112 !important; }\n\n.border-0 {\n  border: 0 !important; }\n\n.border-top-0 {\n  border-top: 0 !important; }\n\n.border-right-0 {\n  border-right: 0 !important; }\n\n.border-bottom-0 {\n  border-bottom: 0 !important; }\n\n.border-left-0 {\n  border-left: 0 !important; }\n\n.rounded {\n  border-radius: 0.25rem; }\n\n.rounded-top {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.rounded-right {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.rounded-bottom {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.rounded-left {\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.rounded-circle {\n  border-radius: 50%; }\n\n.rounded-0 {\n  border-radius: 0; }\n\n.clearfix::after {\n  display: block;\n  content: \"\";\n  clear: both; }\n\n.d-none {\n  display: none !important; }\n\n.d-inline {\n  display: inline !important; }\n\n.d-inline-block {\n  display: inline-block !important; }\n\n.d-block {\n  display: block !important; }\n\n.d-table {\n  display: table !important; }\n\n.d-table-cell {\n  display: table-cell !important; }\n\n.d-flex {\n  display: -webkit-box !important;\n  display: -ms-flexbox !important;\n  display: flex !important; }\n\n.d-inline-flex {\n  display: -webkit-inline-box !important;\n  display: -ms-inline-flexbox !important;\n  display: inline-flex !important; }\n\n@media (min-width: 576px) {\n  .d-sm-none {\n    display: none !important; }\n  .d-sm-inline {\n    display: inline !important; }\n  .d-sm-inline-block {\n    display: inline-block !important; }\n  .d-sm-block {\n    display: block !important; }\n  .d-sm-table {\n    display: table !important; }\n  .d-sm-table-cell {\n    display: table-cell !important; }\n  .d-sm-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-sm-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n@media (min-width: 768px) {\n  .d-md-none {\n    display: none !important; }\n  .d-md-inline {\n    display: inline !important; }\n  .d-md-inline-block {\n    display: inline-block !important; }\n  .d-md-block {\n    display: block !important; }\n  .d-md-table {\n    display: table !important; }\n  .d-md-table-cell {\n    display: table-cell !important; }\n  .d-md-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-md-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n@media (min-width: 992px) {\n  .d-lg-none {\n    display: none !important; }\n  .d-lg-inline {\n    display: inline !important; }\n  .d-lg-inline-block {\n    display: inline-block !important; }\n  .d-lg-block {\n    display: block !important; }\n  .d-lg-table {\n    display: table !important; }\n  .d-lg-table-cell {\n    display: table-cell !important; }\n  .d-lg-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-lg-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n@media (min-width: 1200px) {\n  .d-xl-none {\n    display: none !important; }\n  .d-xl-inline {\n    display: inline !important; }\n  .d-xl-inline-block {\n    display: inline-block !important; }\n  .d-xl-block {\n    display: block !important; }\n  .d-xl-table {\n    display: table !important; }\n  .d-xl-table-cell {\n    display: table-cell !important; }\n  .d-xl-flex {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  .d-xl-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important; } }\n\n.flex-first {\n  -webkit-box-ordinal-group: 0;\n      -ms-flex-order: -1;\n          order: -1; }\n\n.flex-last {\n  -webkit-box-ordinal-group: 2;\n      -ms-flex-order: 1;\n          order: 1; }\n\n.flex-unordered {\n  -webkit-box-ordinal-group: 1;\n      -ms-flex-order: 0;\n          order: 0; }\n\n.flex-row {\n  -webkit-box-orient: horizontal !important;\n  -webkit-box-direction: normal !important;\n      -ms-flex-direction: row !important;\n          flex-direction: row !important; }\n\n.flex-column {\n  -webkit-box-orient: vertical !important;\n  -webkit-box-direction: normal !important;\n      -ms-flex-direction: column !important;\n          flex-direction: column !important; }\n\n.flex-row-reverse {\n  -webkit-box-orient: horizontal !important;\n  -webkit-box-direction: reverse !important;\n      -ms-flex-direction: row-reverse !important;\n          flex-direction: row-reverse !important; }\n\n.flex-column-reverse {\n  -webkit-box-orient: vertical !important;\n  -webkit-box-direction: reverse !important;\n      -ms-flex-direction: column-reverse !important;\n          flex-direction: column-reverse !important; }\n\n.flex-wrap {\n  -ms-flex-wrap: wrap !important;\n      flex-wrap: wrap !important; }\n\n.flex-nowrap {\n  -ms-flex-wrap: nowrap !important;\n      flex-wrap: nowrap !important; }\n\n.flex-wrap-reverse {\n  -ms-flex-wrap: wrap-reverse !important;\n      flex-wrap: wrap-reverse !important; }\n\n.justify-content-start {\n  -webkit-box-pack: start !important;\n      -ms-flex-pack: start !important;\n          justify-content: flex-start !important; }\n\n.justify-content-end {\n  -webkit-box-pack: end !important;\n      -ms-flex-pack: end !important;\n          justify-content: flex-end !important; }\n\n.justify-content-center {\n  -webkit-box-pack: center !important;\n      -ms-flex-pack: center !important;\n          justify-content: center !important; }\n\n.justify-content-between {\n  -webkit-box-pack: justify !important;\n      -ms-flex-pack: justify !important;\n          justify-content: space-between !important; }\n\n.justify-content-around {\n  -ms-flex-pack: distribute !important;\n      justify-content: space-around !important; }\n\n.align-items-start {\n  -webkit-box-align: start !important;\n      -ms-flex-align: start !important;\n          align-items: flex-start !important; }\n\n.align-items-end {\n  -webkit-box-align: end !important;\n      -ms-flex-align: end !important;\n          align-items: flex-end !important; }\n\n.align-items-center {\n  -webkit-box-align: center !important;\n      -ms-flex-align: center !important;\n          align-items: center !important; }\n\n.align-items-baseline {\n  -webkit-box-align: baseline !important;\n      -ms-flex-align: baseline !important;\n          align-items: baseline !important; }\n\n.align-items-stretch {\n  -webkit-box-align: stretch !important;\n      -ms-flex-align: stretch !important;\n          align-items: stretch !important; }\n\n.align-content-start {\n  -ms-flex-line-pack: start !important;\n      align-content: flex-start !important; }\n\n.align-content-end {\n  -ms-flex-line-pack: end !important;\n      align-content: flex-end !important; }\n\n.align-content-center {\n  -ms-flex-line-pack: center !important;\n      align-content: center !important; }\n\n.align-content-between {\n  -ms-flex-line-pack: justify !important;\n      align-content: space-between !important; }\n\n.align-content-around {\n  -ms-flex-line-pack: distribute !important;\n      align-content: space-around !important; }\n\n.align-content-stretch {\n  -ms-flex-line-pack: stretch !important;\n      align-content: stretch !important; }\n\n.align-self-auto {\n  -ms-flex-item-align: auto !important;\n      -ms-grid-row-align: auto !important;\n      align-self: auto !important; }\n\n.align-self-start {\n  -ms-flex-item-align: start !important;\n      align-self: flex-start !important; }\n\n.align-self-end {\n  -ms-flex-item-align: end !important;\n      align-self: flex-end !important; }\n\n.align-self-center {\n  -ms-flex-item-align: center !important;\n      -ms-grid-row-align: center !important;\n      align-self: center !important; }\n\n.align-self-baseline {\n  -ms-flex-item-align: baseline !important;\n      align-self: baseline !important; }\n\n.align-self-stretch {\n  -ms-flex-item-align: stretch !important;\n      -ms-grid-row-align: stretch !important;\n      align-self: stretch !important; }\n\n@media (min-width: 576px) {\n  .flex-sm-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-sm-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-sm-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-sm-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-sm-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-sm-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-sm-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-sm-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-sm-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-sm-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-sm-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-sm-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-sm-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-sm-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-sm-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-sm-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-sm-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-sm-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-sm-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-sm-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-sm-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-sm-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-sm-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-sm-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-sm-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-sm-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-sm-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-sm-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-sm-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-sm-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-sm-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-sm-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n@media (min-width: 768px) {\n  .flex-md-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-md-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-md-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-md-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-md-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-md-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-md-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-md-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-md-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-md-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-md-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-md-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-md-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-md-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-md-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-md-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-md-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-md-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-md-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-md-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-md-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-md-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-md-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-md-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-md-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-md-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-md-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-md-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-md-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-md-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-md-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-md-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n@media (min-width: 992px) {\n  .flex-lg-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-lg-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-lg-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-lg-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-lg-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-lg-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-lg-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-lg-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-lg-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-lg-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-lg-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-lg-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-lg-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-lg-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-lg-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-lg-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-lg-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-lg-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-lg-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-lg-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-lg-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-lg-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-lg-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-lg-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-lg-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-lg-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-lg-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-lg-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-lg-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-lg-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-lg-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-lg-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n@media (min-width: 1200px) {\n  .flex-xl-first {\n    -webkit-box-ordinal-group: 0;\n        -ms-flex-order: -1;\n            order: -1; }\n  .flex-xl-last {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .flex-xl-unordered {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0; }\n  .flex-xl-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important; }\n  .flex-xl-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important; }\n  .flex-xl-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important; }\n  .flex-xl-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important; }\n  .flex-xl-wrap {\n    -ms-flex-wrap: wrap !important;\n        flex-wrap: wrap !important; }\n  .flex-xl-nowrap {\n    -ms-flex-wrap: nowrap !important;\n        flex-wrap: nowrap !important; }\n  .flex-xl-wrap-reverse {\n    -ms-flex-wrap: wrap-reverse !important;\n        flex-wrap: wrap-reverse !important; }\n  .justify-content-xl-start {\n    -webkit-box-pack: start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important; }\n  .justify-content-xl-end {\n    -webkit-box-pack: end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important; }\n  .justify-content-xl-center {\n    -webkit-box-pack: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important; }\n  .justify-content-xl-between {\n    -webkit-box-pack: justify !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important; }\n  .justify-content-xl-around {\n    -ms-flex-pack: distribute !important;\n        justify-content: space-around !important; }\n  .align-items-xl-start {\n    -webkit-box-align: start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important; }\n  .align-items-xl-end {\n    -webkit-box-align: end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important; }\n  .align-items-xl-center {\n    -webkit-box-align: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important; }\n  .align-items-xl-baseline {\n    -webkit-box-align: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important; }\n  .align-items-xl-stretch {\n    -webkit-box-align: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important; }\n  .align-content-xl-start {\n    -ms-flex-line-pack: start !important;\n        align-content: flex-start !important; }\n  .align-content-xl-end {\n    -ms-flex-line-pack: end !important;\n        align-content: flex-end !important; }\n  .align-content-xl-center {\n    -ms-flex-line-pack: center !important;\n        align-content: center !important; }\n  .align-content-xl-between {\n    -ms-flex-line-pack: justify !important;\n        align-content: space-between !important; }\n  .align-content-xl-around {\n    -ms-flex-line-pack: distribute !important;\n        align-content: space-around !important; }\n  .align-content-xl-stretch {\n    -ms-flex-line-pack: stretch !important;\n        align-content: stretch !important; }\n  .align-self-xl-auto {\n    -ms-flex-item-align: auto !important;\n        -ms-grid-row-align: auto !important;\n        align-self: auto !important; }\n  .align-self-xl-start {\n    -ms-flex-item-align: start !important;\n        align-self: flex-start !important; }\n  .align-self-xl-end {\n    -ms-flex-item-align: end !important;\n        align-self: flex-end !important; }\n  .align-self-xl-center {\n    -ms-flex-item-align: center !important;\n        -ms-grid-row-align: center !important;\n        align-self: center !important; }\n  .align-self-xl-baseline {\n    -ms-flex-item-align: baseline !important;\n        align-self: baseline !important; }\n  .align-self-xl-stretch {\n    -ms-flex-item-align: stretch !important;\n        -ms-grid-row-align: stretch !important;\n        align-self: stretch !important; } }\n\n.float-left {\n  float: left !important; }\n\n.float-right {\n  float: right !important; }\n\n.float-none {\n  float: none !important; }\n\n@media (min-width: 576px) {\n  .float-sm-left {\n    float: left !important; }\n  .float-sm-right {\n    float: right !important; }\n  .float-sm-none {\n    float: none !important; } }\n\n@media (min-width: 768px) {\n  .float-md-left {\n    float: left !important; }\n  .float-md-right {\n    float: right !important; }\n  .float-md-none {\n    float: none !important; } }\n\n@media (min-width: 992px) {\n  .float-lg-left {\n    float: left !important; }\n  .float-lg-right {\n    float: right !important; }\n  .float-lg-none {\n    float: none !important; } }\n\n@media (min-width: 1200px) {\n  .float-xl-left {\n    float: left !important; }\n  .float-xl-right {\n    float: right !important; }\n  .float-xl-none {\n    float: none !important; } }\n\n.fixed-top {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n\n.fixed-bottom {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030; }\n\n.sticky-top {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 1030; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n\n.w-25 {\n  width: 25% !important; }\n\n.w-50 {\n  width: 50% !important; }\n\n.w-75 {\n  width: 75% !important; }\n\n.w-100 {\n  width: 100% !important; }\n\n.h-25 {\n  height: 25% !important; }\n\n.h-50 {\n  height: 50% !important; }\n\n.h-75 {\n  height: 75% !important; }\n\n.h-100 {\n  height: 100% !important; }\n\n.mw-100 {\n  max-width: 100% !important; }\n\n.mh-100 {\n  max-height: 100% !important; }\n\n.m-0 {\n  margin: 0 0 !important; }\n\n.mt-0 {\n  margin-top: 0 !important; }\n\n.mr-0 {\n  margin-right: 0 !important; }\n\n.mb-0 {\n  margin-bottom: 0 !important; }\n\n.ml-0 {\n  margin-left: 0 !important; }\n\n.mx-0 {\n  margin-right: 0 !important;\n  margin-left: 0 !important; }\n\n.my-0 {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important; }\n\n.m-1 {\n  margin: 0.25rem 0.25rem !important; }\n\n.mt-1 {\n  margin-top: 0.25rem !important; }\n\n.mr-1 {\n  margin-right: 0.25rem !important; }\n\n.mb-1 {\n  margin-bottom: 0.25rem !important; }\n\n.ml-1 {\n  margin-left: 0.25rem !important; }\n\n.mx-1 {\n  margin-right: 0.25rem !important;\n  margin-left: 0.25rem !important; }\n\n.my-1 {\n  margin-top: 0.25rem !important;\n  margin-bottom: 0.25rem !important; }\n\n.m-2 {\n  margin: 0.5rem 0.5rem !important; }\n\n.mt-2 {\n  margin-top: 0.5rem !important; }\n\n.mr-2 {\n  margin-right: 0.5rem !important; }\n\n.mb-2 {\n  margin-bottom: 0.5rem !important; }\n\n.ml-2 {\n  margin-left: 0.5rem !important; }\n\n.mx-2 {\n  margin-right: 0.5rem !important;\n  margin-left: 0.5rem !important; }\n\n.my-2 {\n  margin-top: 0.5rem !important;\n  margin-bottom: 0.5rem !important; }\n\n.m-3 {\n  margin: 1rem 1rem !important; }\n\n.mt-3 {\n  margin-top: 1rem !important; }\n\n.mr-3 {\n  margin-right: 1rem !important; }\n\n.mb-3 {\n  margin-bottom: 1rem !important; }\n\n.ml-3 {\n  margin-left: 1rem !important; }\n\n.mx-3 {\n  margin-right: 1rem !important;\n  margin-left: 1rem !important; }\n\n.my-3 {\n  margin-top: 1rem !important;\n  margin-bottom: 1rem !important; }\n\n.m-4 {\n  margin: 1.5rem 1.5rem !important; }\n\n.mt-4 {\n  margin-top: 1.5rem !important; }\n\n.mr-4 {\n  margin-right: 1.5rem !important; }\n\n.mb-4 {\n  margin-bottom: 1.5rem !important; }\n\n.ml-4 {\n  margin-left: 1.5rem !important; }\n\n.mx-4 {\n  margin-right: 1.5rem !important;\n  margin-left: 1.5rem !important; }\n\n.my-4 {\n  margin-top: 1.5rem !important;\n  margin-bottom: 1.5rem !important; }\n\n.m-5 {\n  margin: 3rem 3rem !important; }\n\n.mt-5 {\n  margin-top: 3rem !important; }\n\n.mr-5 {\n  margin-right: 3rem !important; }\n\n.mb-5 {\n  margin-bottom: 3rem !important; }\n\n.ml-5 {\n  margin-left: 3rem !important; }\n\n.mx-5 {\n  margin-right: 3rem !important;\n  margin-left: 3rem !important; }\n\n.my-5 {\n  margin-top: 3rem !important;\n  margin-bottom: 3rem !important; }\n\n.p-0 {\n  padding: 0 0 !important; }\n\n.pt-0 {\n  padding-top: 0 !important; }\n\n.pr-0 {\n  padding-right: 0 !important; }\n\n.pb-0 {\n  padding-bottom: 0 !important; }\n\n.pl-0 {\n  padding-left: 0 !important; }\n\n.px-0 {\n  padding-right: 0 !important;\n  padding-left: 0 !important; }\n\n.py-0 {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important; }\n\n.p-1 {\n  padding: 0.25rem 0.25rem !important; }\n\n.pt-1 {\n  padding-top: 0.25rem !important; }\n\n.pr-1 {\n  padding-right: 0.25rem !important; }\n\n.pb-1 {\n  padding-bottom: 0.25rem !important; }\n\n.pl-1 {\n  padding-left: 0.25rem !important; }\n\n.px-1 {\n  padding-right: 0.25rem !important;\n  padding-left: 0.25rem !important; }\n\n.py-1 {\n  padding-top: 0.25rem !important;\n  padding-bottom: 0.25rem !important; }\n\n.p-2 {\n  padding: 0.5rem 0.5rem !important; }\n\n.pt-2 {\n  padding-top: 0.5rem !important; }\n\n.pr-2 {\n  padding-right: 0.5rem !important; }\n\n.pb-2 {\n  padding-bottom: 0.5rem !important; }\n\n.pl-2 {\n  padding-left: 0.5rem !important; }\n\n.px-2 {\n  padding-right: 0.5rem !important;\n  padding-left: 0.5rem !important; }\n\n.py-2 {\n  padding-top: 0.5rem !important;\n  padding-bottom: 0.5rem !important; }\n\n.p-3 {\n  padding: 1rem 1rem !important; }\n\n.pt-3 {\n  padding-top: 1rem !important; }\n\n.pr-3 {\n  padding-right: 1rem !important; }\n\n.pb-3 {\n  padding-bottom: 1rem !important; }\n\n.pl-3 {\n  padding-left: 1rem !important; }\n\n.px-3 {\n  padding-right: 1rem !important;\n  padding-left: 1rem !important; }\n\n.py-3 {\n  padding-top: 1rem !important;\n  padding-bottom: 1rem !important; }\n\n.p-4 {\n  padding: 1.5rem 1.5rem !important; }\n\n.pt-4 {\n  padding-top: 1.5rem !important; }\n\n.pr-4 {\n  padding-right: 1.5rem !important; }\n\n.pb-4 {\n  padding-bottom: 1.5rem !important; }\n\n.pl-4 {\n  padding-left: 1.5rem !important; }\n\n.px-4 {\n  padding-right: 1.5rem !important;\n  padding-left: 1.5rem !important; }\n\n.py-4 {\n  padding-top: 1.5rem !important;\n  padding-bottom: 1.5rem !important; }\n\n.p-5 {\n  padding: 3rem 3rem !important; }\n\n.pt-5 {\n  padding-top: 3rem !important; }\n\n.pr-5 {\n  padding-right: 3rem !important; }\n\n.pb-5 {\n  padding-bottom: 3rem !important; }\n\n.pl-5 {\n  padding-left: 3rem !important; }\n\n.px-5 {\n  padding-right: 3rem !important;\n  padding-left: 3rem !important; }\n\n.py-5 {\n  padding-top: 3rem !important;\n  padding-bottom: 3rem !important; }\n\n.m-auto {\n  margin: auto !important; }\n\n.mt-auto {\n  margin-top: auto !important; }\n\n.mr-auto {\n  margin-right: auto !important; }\n\n.mb-auto {\n  margin-bottom: auto !important; }\n\n.ml-auto {\n  margin-left: auto !important; }\n\n.mx-auto {\n  margin-right: auto !important;\n  margin-left: auto !important; }\n\n.my-auto {\n  margin-top: auto !important;\n  margin-bottom: auto !important; }\n\n@media (min-width: 576px) {\n  .m-sm-0 {\n    margin: 0 0 !important; }\n  .mt-sm-0 {\n    margin-top: 0 !important; }\n  .mr-sm-0 {\n    margin-right: 0 !important; }\n  .mb-sm-0 {\n    margin-bottom: 0 !important; }\n  .ml-sm-0 {\n    margin-left: 0 !important; }\n  .mx-sm-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-sm-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-sm-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-sm-1 {\n    margin-top: 0.25rem !important; }\n  .mr-sm-1 {\n    margin-right: 0.25rem !important; }\n  .mb-sm-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-sm-1 {\n    margin-left: 0.25rem !important; }\n  .mx-sm-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-sm-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-sm-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-sm-2 {\n    margin-top: 0.5rem !important; }\n  .mr-sm-2 {\n    margin-right: 0.5rem !important; }\n  .mb-sm-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-sm-2 {\n    margin-left: 0.5rem !important; }\n  .mx-sm-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-sm-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-sm-3 {\n    margin: 1rem 1rem !important; }\n  .mt-sm-3 {\n    margin-top: 1rem !important; }\n  .mr-sm-3 {\n    margin-right: 1rem !important; }\n  .mb-sm-3 {\n    margin-bottom: 1rem !important; }\n  .ml-sm-3 {\n    margin-left: 1rem !important; }\n  .mx-sm-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-sm-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-sm-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-sm-4 {\n    margin-top: 1.5rem !important; }\n  .mr-sm-4 {\n    margin-right: 1.5rem !important; }\n  .mb-sm-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-sm-4 {\n    margin-left: 1.5rem !important; }\n  .mx-sm-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-sm-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-sm-5 {\n    margin: 3rem 3rem !important; }\n  .mt-sm-5 {\n    margin-top: 3rem !important; }\n  .mr-sm-5 {\n    margin-right: 3rem !important; }\n  .mb-sm-5 {\n    margin-bottom: 3rem !important; }\n  .ml-sm-5 {\n    margin-left: 3rem !important; }\n  .mx-sm-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-sm-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-sm-0 {\n    padding: 0 0 !important; }\n  .pt-sm-0 {\n    padding-top: 0 !important; }\n  .pr-sm-0 {\n    padding-right: 0 !important; }\n  .pb-sm-0 {\n    padding-bottom: 0 !important; }\n  .pl-sm-0 {\n    padding-left: 0 !important; }\n  .px-sm-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-sm-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-sm-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-sm-1 {\n    padding-top: 0.25rem !important; }\n  .pr-sm-1 {\n    padding-right: 0.25rem !important; }\n  .pb-sm-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-sm-1 {\n    padding-left: 0.25rem !important; }\n  .px-sm-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-sm-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-sm-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-sm-2 {\n    padding-top: 0.5rem !important; }\n  .pr-sm-2 {\n    padding-right: 0.5rem !important; }\n  .pb-sm-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-sm-2 {\n    padding-left: 0.5rem !important; }\n  .px-sm-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-sm-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-sm-3 {\n    padding: 1rem 1rem !important; }\n  .pt-sm-3 {\n    padding-top: 1rem !important; }\n  .pr-sm-3 {\n    padding-right: 1rem !important; }\n  .pb-sm-3 {\n    padding-bottom: 1rem !important; }\n  .pl-sm-3 {\n    padding-left: 1rem !important; }\n  .px-sm-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-sm-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-sm-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-sm-4 {\n    padding-top: 1.5rem !important; }\n  .pr-sm-4 {\n    padding-right: 1.5rem !important; }\n  .pb-sm-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-sm-4 {\n    padding-left: 1.5rem !important; }\n  .px-sm-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-sm-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-sm-5 {\n    padding: 3rem 3rem !important; }\n  .pt-sm-5 {\n    padding-top: 3rem !important; }\n  .pr-sm-5 {\n    padding-right: 3rem !important; }\n  .pb-sm-5 {\n    padding-bottom: 3rem !important; }\n  .pl-sm-5 {\n    padding-left: 3rem !important; }\n  .px-sm-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-sm-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-sm-auto {\n    margin: auto !important; }\n  .mt-sm-auto {\n    margin-top: auto !important; }\n  .mr-sm-auto {\n    margin-right: auto !important; }\n  .mb-sm-auto {\n    margin-bottom: auto !important; }\n  .ml-sm-auto {\n    margin-left: auto !important; }\n  .mx-sm-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-sm-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 768px) {\n  .m-md-0 {\n    margin: 0 0 !important; }\n  .mt-md-0 {\n    margin-top: 0 !important; }\n  .mr-md-0 {\n    margin-right: 0 !important; }\n  .mb-md-0 {\n    margin-bottom: 0 !important; }\n  .ml-md-0 {\n    margin-left: 0 !important; }\n  .mx-md-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-md-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-md-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-md-1 {\n    margin-top: 0.25rem !important; }\n  .mr-md-1 {\n    margin-right: 0.25rem !important; }\n  .mb-md-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-md-1 {\n    margin-left: 0.25rem !important; }\n  .mx-md-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-md-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-md-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-md-2 {\n    margin-top: 0.5rem !important; }\n  .mr-md-2 {\n    margin-right: 0.5rem !important; }\n  .mb-md-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-md-2 {\n    margin-left: 0.5rem !important; }\n  .mx-md-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-md-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-md-3 {\n    margin: 1rem 1rem !important; }\n  .mt-md-3 {\n    margin-top: 1rem !important; }\n  .mr-md-3 {\n    margin-right: 1rem !important; }\n  .mb-md-3 {\n    margin-bottom: 1rem !important; }\n  .ml-md-3 {\n    margin-left: 1rem !important; }\n  .mx-md-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-md-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-md-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-md-4 {\n    margin-top: 1.5rem !important; }\n  .mr-md-4 {\n    margin-right: 1.5rem !important; }\n  .mb-md-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-md-4 {\n    margin-left: 1.5rem !important; }\n  .mx-md-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-md-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-md-5 {\n    margin: 3rem 3rem !important; }\n  .mt-md-5 {\n    margin-top: 3rem !important; }\n  .mr-md-5 {\n    margin-right: 3rem !important; }\n  .mb-md-5 {\n    margin-bottom: 3rem !important; }\n  .ml-md-5 {\n    margin-left: 3rem !important; }\n  .mx-md-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-md-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-md-0 {\n    padding: 0 0 !important; }\n  .pt-md-0 {\n    padding-top: 0 !important; }\n  .pr-md-0 {\n    padding-right: 0 !important; }\n  .pb-md-0 {\n    padding-bottom: 0 !important; }\n  .pl-md-0 {\n    padding-left: 0 !important; }\n  .px-md-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-md-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-md-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-md-1 {\n    padding-top: 0.25rem !important; }\n  .pr-md-1 {\n    padding-right: 0.25rem !important; }\n  .pb-md-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-md-1 {\n    padding-left: 0.25rem !important; }\n  .px-md-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-md-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-md-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-md-2 {\n    padding-top: 0.5rem !important; }\n  .pr-md-2 {\n    padding-right: 0.5rem !important; }\n  .pb-md-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-md-2 {\n    padding-left: 0.5rem !important; }\n  .px-md-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-md-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-md-3 {\n    padding: 1rem 1rem !important; }\n  .pt-md-3 {\n    padding-top: 1rem !important; }\n  .pr-md-3 {\n    padding-right: 1rem !important; }\n  .pb-md-3 {\n    padding-bottom: 1rem !important; }\n  .pl-md-3 {\n    padding-left: 1rem !important; }\n  .px-md-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-md-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-md-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-md-4 {\n    padding-top: 1.5rem !important; }\n  .pr-md-4 {\n    padding-right: 1.5rem !important; }\n  .pb-md-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-md-4 {\n    padding-left: 1.5rem !important; }\n  .px-md-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-md-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-md-5 {\n    padding: 3rem 3rem !important; }\n  .pt-md-5 {\n    padding-top: 3rem !important; }\n  .pr-md-5 {\n    padding-right: 3rem !important; }\n  .pb-md-5 {\n    padding-bottom: 3rem !important; }\n  .pl-md-5 {\n    padding-left: 3rem !important; }\n  .px-md-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-md-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-md-auto {\n    margin: auto !important; }\n  .mt-md-auto {\n    margin-top: auto !important; }\n  .mr-md-auto {\n    margin-right: auto !important; }\n  .mb-md-auto {\n    margin-bottom: auto !important; }\n  .ml-md-auto {\n    margin-left: auto !important; }\n  .mx-md-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-md-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 992px) {\n  .m-lg-0 {\n    margin: 0 0 !important; }\n  .mt-lg-0 {\n    margin-top: 0 !important; }\n  .mr-lg-0 {\n    margin-right: 0 !important; }\n  .mb-lg-0 {\n    margin-bottom: 0 !important; }\n  .ml-lg-0 {\n    margin-left: 0 !important; }\n  .mx-lg-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-lg-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-lg-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-lg-1 {\n    margin-top: 0.25rem !important; }\n  .mr-lg-1 {\n    margin-right: 0.25rem !important; }\n  .mb-lg-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-lg-1 {\n    margin-left: 0.25rem !important; }\n  .mx-lg-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-lg-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-lg-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-lg-2 {\n    margin-top: 0.5rem !important; }\n  .mr-lg-2 {\n    margin-right: 0.5rem !important; }\n  .mb-lg-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-lg-2 {\n    margin-left: 0.5rem !important; }\n  .mx-lg-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-lg-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-lg-3 {\n    margin: 1rem 1rem !important; }\n  .mt-lg-3 {\n    margin-top: 1rem !important; }\n  .mr-lg-3 {\n    margin-right: 1rem !important; }\n  .mb-lg-3 {\n    margin-bottom: 1rem !important; }\n  .ml-lg-3 {\n    margin-left: 1rem !important; }\n  .mx-lg-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-lg-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-lg-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-lg-4 {\n    margin-top: 1.5rem !important; }\n  .mr-lg-4 {\n    margin-right: 1.5rem !important; }\n  .mb-lg-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-lg-4 {\n    margin-left: 1.5rem !important; }\n  .mx-lg-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-lg-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-lg-5 {\n    margin: 3rem 3rem !important; }\n  .mt-lg-5 {\n    margin-top: 3rem !important; }\n  .mr-lg-5 {\n    margin-right: 3rem !important; }\n  .mb-lg-5 {\n    margin-bottom: 3rem !important; }\n  .ml-lg-5 {\n    margin-left: 3rem !important; }\n  .mx-lg-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-lg-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-lg-0 {\n    padding: 0 0 !important; }\n  .pt-lg-0 {\n    padding-top: 0 !important; }\n  .pr-lg-0 {\n    padding-right: 0 !important; }\n  .pb-lg-0 {\n    padding-bottom: 0 !important; }\n  .pl-lg-0 {\n    padding-left: 0 !important; }\n  .px-lg-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-lg-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-lg-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-lg-1 {\n    padding-top: 0.25rem !important; }\n  .pr-lg-1 {\n    padding-right: 0.25rem !important; }\n  .pb-lg-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-lg-1 {\n    padding-left: 0.25rem !important; }\n  .px-lg-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-lg-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-lg-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-lg-2 {\n    padding-top: 0.5rem !important; }\n  .pr-lg-2 {\n    padding-right: 0.5rem !important; }\n  .pb-lg-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-lg-2 {\n    padding-left: 0.5rem !important; }\n  .px-lg-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-lg-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-lg-3 {\n    padding: 1rem 1rem !important; }\n  .pt-lg-3 {\n    padding-top: 1rem !important; }\n  .pr-lg-3 {\n    padding-right: 1rem !important; }\n  .pb-lg-3 {\n    padding-bottom: 1rem !important; }\n  .pl-lg-3 {\n    padding-left: 1rem !important; }\n  .px-lg-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-lg-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-lg-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-lg-4 {\n    padding-top: 1.5rem !important; }\n  .pr-lg-4 {\n    padding-right: 1.5rem !important; }\n  .pb-lg-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-lg-4 {\n    padding-left: 1.5rem !important; }\n  .px-lg-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-lg-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-lg-5 {\n    padding: 3rem 3rem !important; }\n  .pt-lg-5 {\n    padding-top: 3rem !important; }\n  .pr-lg-5 {\n    padding-right: 3rem !important; }\n  .pb-lg-5 {\n    padding-bottom: 3rem !important; }\n  .pl-lg-5 {\n    padding-left: 3rem !important; }\n  .px-lg-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-lg-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-lg-auto {\n    margin: auto !important; }\n  .mt-lg-auto {\n    margin-top: auto !important; }\n  .mr-lg-auto {\n    margin-right: auto !important; }\n  .mb-lg-auto {\n    margin-bottom: auto !important; }\n  .ml-lg-auto {\n    margin-left: auto !important; }\n  .mx-lg-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-lg-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n@media (min-width: 1200px) {\n  .m-xl-0 {\n    margin: 0 0 !important; }\n  .mt-xl-0 {\n    margin-top: 0 !important; }\n  .mr-xl-0 {\n    margin-right: 0 !important; }\n  .mb-xl-0 {\n    margin-bottom: 0 !important; }\n  .ml-xl-0 {\n    margin-left: 0 !important; }\n  .mx-xl-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important; }\n  .my-xl-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .m-xl-1 {\n    margin: 0.25rem 0.25rem !important; }\n  .mt-xl-1 {\n    margin-top: 0.25rem !important; }\n  .mr-xl-1 {\n    margin-right: 0.25rem !important; }\n  .mb-xl-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-xl-1 {\n    margin-left: 0.25rem !important; }\n  .mx-xl-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important; }\n  .my-xl-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important; }\n  .m-xl-2 {\n    margin: 0.5rem 0.5rem !important; }\n  .mt-xl-2 {\n    margin-top: 0.5rem !important; }\n  .mr-xl-2 {\n    margin-right: 0.5rem !important; }\n  .mb-xl-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-xl-2 {\n    margin-left: 0.5rem !important; }\n  .mx-xl-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important; }\n  .my-xl-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important; }\n  .m-xl-3 {\n    margin: 1rem 1rem !important; }\n  .mt-xl-3 {\n    margin-top: 1rem !important; }\n  .mr-xl-3 {\n    margin-right: 1rem !important; }\n  .mb-xl-3 {\n    margin-bottom: 1rem !important; }\n  .ml-xl-3 {\n    margin-left: 1rem !important; }\n  .mx-xl-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important; }\n  .my-xl-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important; }\n  .m-xl-4 {\n    margin: 1.5rem 1.5rem !important; }\n  .mt-xl-4 {\n    margin-top: 1.5rem !important; }\n  .mr-xl-4 {\n    margin-right: 1.5rem !important; }\n  .mb-xl-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-xl-4 {\n    margin-left: 1.5rem !important; }\n  .mx-xl-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important; }\n  .my-xl-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important; }\n  .m-xl-5 {\n    margin: 3rem 3rem !important; }\n  .mt-xl-5 {\n    margin-top: 3rem !important; }\n  .mr-xl-5 {\n    margin-right: 3rem !important; }\n  .mb-xl-5 {\n    margin-bottom: 3rem !important; }\n  .ml-xl-5 {\n    margin-left: 3rem !important; }\n  .mx-xl-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important; }\n  .my-xl-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important; }\n  .p-xl-0 {\n    padding: 0 0 !important; }\n  .pt-xl-0 {\n    padding-top: 0 !important; }\n  .pr-xl-0 {\n    padding-right: 0 !important; }\n  .pb-xl-0 {\n    padding-bottom: 0 !important; }\n  .pl-xl-0 {\n    padding-left: 0 !important; }\n  .px-xl-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important; }\n  .py-xl-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important; }\n  .p-xl-1 {\n    padding: 0.25rem 0.25rem !important; }\n  .pt-xl-1 {\n    padding-top: 0.25rem !important; }\n  .pr-xl-1 {\n    padding-right: 0.25rem !important; }\n  .pb-xl-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-xl-1 {\n    padding-left: 0.25rem !important; }\n  .px-xl-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important; }\n  .py-xl-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important; }\n  .p-xl-2 {\n    padding: 0.5rem 0.5rem !important; }\n  .pt-xl-2 {\n    padding-top: 0.5rem !important; }\n  .pr-xl-2 {\n    padding-right: 0.5rem !important; }\n  .pb-xl-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-xl-2 {\n    padding-left: 0.5rem !important; }\n  .px-xl-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important; }\n  .py-xl-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important; }\n  .p-xl-3 {\n    padding: 1rem 1rem !important; }\n  .pt-xl-3 {\n    padding-top: 1rem !important; }\n  .pr-xl-3 {\n    padding-right: 1rem !important; }\n  .pb-xl-3 {\n    padding-bottom: 1rem !important; }\n  .pl-xl-3 {\n    padding-left: 1rem !important; }\n  .px-xl-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important; }\n  .py-xl-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important; }\n  .p-xl-4 {\n    padding: 1.5rem 1.5rem !important; }\n  .pt-xl-4 {\n    padding-top: 1.5rem !important; }\n  .pr-xl-4 {\n    padding-right: 1.5rem !important; }\n  .pb-xl-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-xl-4 {\n    padding-left: 1.5rem !important; }\n  .px-xl-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important; }\n  .py-xl-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important; }\n  .p-xl-5 {\n    padding: 3rem 3rem !important; }\n  .pt-xl-5 {\n    padding-top: 3rem !important; }\n  .pr-xl-5 {\n    padding-right: 3rem !important; }\n  .pb-xl-5 {\n    padding-bottom: 3rem !important; }\n  .pl-xl-5 {\n    padding-left: 3rem !important; }\n  .px-xl-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important; }\n  .py-xl-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important; }\n  .m-xl-auto {\n    margin: auto !important; }\n  .mt-xl-auto {\n    margin-top: auto !important; }\n  .mr-xl-auto {\n    margin-right: auto !important; }\n  .mb-xl-auto {\n    margin-bottom: auto !important; }\n  .ml-xl-auto {\n    margin-left: auto !important; }\n  .mx-xl-auto {\n    margin-right: auto !important;\n    margin-left: auto !important; }\n  .my-xl-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important; } }\n\n.text-justify {\n  text-align: justify !important; }\n\n.text-nowrap {\n  white-space: nowrap !important; }\n\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.text-left {\n  text-align: left !important; }\n\n.text-right, dl.row dt {\n  text-align: right !important; }\n\n.text-center {\n  text-align: center !important; }\n\n@media (min-width: 576px) {\n  .text-sm-left {\n    text-align: left !important; }\n  .text-sm-right {\n    text-align: right !important; }\n  .text-sm-center {\n    text-align: center !important; } }\n\n@media (min-width: 768px) {\n  .text-md-left {\n    text-align: left !important; }\n  .text-md-right {\n    text-align: right !important; }\n  .text-md-center {\n    text-align: center !important; } }\n\n@media (min-width: 992px) {\n  .text-lg-left {\n    text-align: left !important; }\n  .text-lg-right {\n    text-align: right !important; }\n  .text-lg-center {\n    text-align: center !important; } }\n\n@media (min-width: 1200px) {\n  .text-xl-left {\n    text-align: left !important; }\n  .text-xl-right {\n    text-align: right !important; }\n  .text-xl-center {\n    text-align: center !important; } }\n\n.text-lowercase {\n  text-transform: lowercase !important; }\n\n.text-uppercase {\n  text-transform: uppercase !important; }\n\n.text-capitalize {\n  text-transform: capitalize !important; }\n\n.font-weight-normal {\n  font-weight: normal; }\n\n.font-weight-bold {\n  font-weight: bold; }\n\n.font-italic {\n  font-style: italic; }\n\n.text-white {\n  color: #fff !important; }\n\n.text-muted {\n  color: #636c72 !important; }\n\na.text-muted:focus, a.text-muted:hover {\n  color: #4b5257 !important; }\n\n.text-primary {\n  color: #0275d8 !important; }\n\na.text-primary:focus, a.text-primary:hover {\n  color: #025aa5 !important; }\n\n.text-success {\n  color: #5cb85c !important; }\n\na.text-success:focus, a.text-success:hover {\n  color: #449d44 !important; }\n\n.text-info {\n  color: #5bc0de !important; }\n\na.text-info:focus, a.text-info:hover {\n  color: #31b0d5 !important; }\n\n.text-warning {\n  color: #f0ad4e !important; }\n\na.text-warning:focus, a.text-warning:hover {\n  color: #ec971f !important; }\n\n.text-danger {\n  color: #d9534f !important; }\n\na.text-danger:focus, a.text-danger:hover {\n  color: #c9302c !important; }\n\n.text-gray-dark {\n  color: #292b2c !important; }\n\na.text-gray-dark:focus, a.text-gray-dark:hover {\n  color: #101112 !important; }\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.invisible {\n  visibility: hidden !important; }\n\n.hidden-xs-up {\n  display: none !important; }\n\n@media (max-width: 575px) {\n  .hidden-xs-down {\n    display: none !important; } }\n\n@media (min-width: 576px) {\n  .hidden-sm-up {\n    display: none !important; } }\n\n@media (max-width: 767px) {\n  .hidden-sm-down {\n    display: none !important; } }\n\n@media (min-width: 768px) {\n  .hidden-md-up {\n    display: none !important; } }\n\n@media (max-width: 991px) {\n  .hidden-md-down {\n    display: none !important; } }\n\n@media (min-width: 992px) {\n  .hidden-lg-up {\n    display: none !important; } }\n\n@media (max-width: 1199px) {\n  .hidden-lg-down {\n    display: none !important; } }\n\n@media (min-width: 1200px) {\n  .hidden-xl-up {\n    display: none !important; } }\n\n.hidden-xl-down {\n  display: none !important; }\n\n.visible-print-block {\n  display: none !important; }\n  @media print {\n    .visible-print-block {\n      display: block !important; } }\n\n.visible-print-inline {\n  display: none !important; }\n  @media print {\n    .visible-print-inline {\n      display: inline !important; } }\n\n.visible-print-inline-block {\n  display: none !important; }\n  @media print {\n    .visible-print-inline-block {\n      display: inline-block !important; } }\n\n@media print {\n  .hidden-print {\n    display: none !important; } }\n\nhtml {\n  box-sizing: border-box; }\n\n*, *:before, *:after {\n  box-sizing: inherit; }\n\nhtml, body {\n  height: 100%;\n  margin: 0;\n  padding: 0; }\n\nbody {\n  background-color: #F8F8F8; }\n\nsection {\n  margin-bottom: 30px;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  border: 0 solid #CCC;\n  border-top-width: 1px; }\n\nbutton, input, optgroup, select, textarea {\n  font-family: inherit; }\n\ninput.auto, textarea.auto, select.auto {\n  width: auto; }\n\ninput[type=checkbox] {\n  -webkit-transform: translateY(6px);\n          transform: translateY(6px);\n  width: auto; }\n\ndl.row dt.wide, dl.row dt.wide + dd {\n  text-align: left !important;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 100%;\n          flex: 0 0 100%;\n  width: 100%;\n  max-width: 100%; }\n\ndl.row dd {\n  margin-bottom: 0.1rem; }\n\nthead, tfoot {\n  background-color: #EEE; }\n\ntfoot {\n  border-top: 2px solid #98ABA6;\n  border-bottom: 1px solid #98ABA6; }\n\n.visually-hidden, label.checkbox input {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.text-overflow {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\nlabel.checkbox span {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background-color: #EEE;\n  color: #F8F8F8;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 20px;\n  text-align: center;\n  box-shadow: 0 0 0 1px #D3D3D3;\n  border-radius: 2px; }\n  label.checkbox span:before {\n    content: '\\2713'; }\n\nlabel.checkbox input:checked + span {\n  color: #0275d8; }\n\n.current {\n  font-weight: 600; }\n  .current a {\n    color: #333; }\n\ntable, .table thead th, table thead th, .table th, table th, .table td, table td {\n  border-color: #98ABA6; }\n\nth:last-child {\n  text-align: right; }\n\n.table tr.alert-paid th, table tr.alert-paid th, .table tr.alert-paid td, table tr.alert-paid td {\n  border-color: gainsboro; }\n\ntable, input {\n  max-width: 100%; }\n\ntable tr > *:nth-child(2),\ntable tr > *:nth-child(3),\ntable tr > *:nth-child(4) {\n  display: none; }\n\n@media (min-width: 576px) {\n  table tr > *:nth-child(2),\n  table tr > *:nth-child(3),\n  table tr > *:nth-child(4) {\n    display: table-cell; } }\n\n.alert-paid {\n  color: #c2c2c2;\n  background-color: transparent;\n  border-color: gainsboro; }\n\n.alert-paid a {\n  color: inherit; }\n\n.alert-late {\n  color: #a6321d;\n  background-color: #fff1f8;\n  border-color: #d4d4d4; }\n\n.alert-late a {\n  color: inherit; }\n\n.alert-late.alert-pending {\n  color: #a66b29;\n  background-color: #fff4e2; }\n\n.alert-paid input.checkbox:checked + label {\n  background-color: transparent;\n  color: #CCC; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 618:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ".name:not(:first-of-type), .name:not(:first-of-type) + * {\n  margin-top: 30px; }\n\ndd {\n  position: relative; }\n\n.dummy-model {\n  position: relative;\n  margin: 0;\n  z-index: 1;\n  width: 100%;\n  min-height: 40px;\n  pointer-events: none; }\n  .dummy-model ul {\n    position: absolute;\n    left: 0;\n    top: 24px;\n    z-index: 1;\n    width: 100%;\n    max-height: 0;\n    overflow: hidden;\n    transition: height 300ms ease; }\n  .dummy-model input:checked + label.btn.btn-sm {\n    background-color: #8894d2; }\n    .dummy-model input:checked + label.btn.btn-sm + ul {\n      max-height: 200px; }\n  .dummy-model label.btn.btn-sm {\n    background-color: #b1bcd7;\n    font-size: 10px;\n    margin: 0;\n    padding: 0.125rem 0.25rem;\n    cursor: pointer;\n    pointer-events: initial; }\n\napp-print-invoice {\n  display: block;\n  width: 210mm;\n  height: 296.9mm;\n  margin: 0 auto 60px;\n  position: relative;\n  z-index: 1;\n  zoom: .4;\n  font-family: \"Istok Web\",\"Helvetica Neue\",Helvetica,Arial,sans-serif; }\n\n.invoice-shade {\n  position: relative;\n  display: block;\n  height: 0;\n  zoom: .399; }\n  .invoice-shade div {\n    position: relative;\n    left: 50%;\n    width: 210mm;\n    height: 296.9mm;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n    .invoice-shade div:before, .invoice-shade div:after {\n      content: '';\n      position: absolute;\n      left: 4%;\n      top: 1%;\n      width: 92%;\n      height: 98%;\n      box-shadow: 4px 8px 64px rgba(0, 0, 0, 0.4); }\n    .invoice-shade div:before {\n      -webkit-transform: skewX(3deg);\n              transform: skewX(3deg); }\n    .invoice-shade div:after {\n      -webkit-transform: skewX(-3deg);\n              transform: skewX(-3deg); }\n\n.invoice {\n  position: relative;\n  z-index: 1;\n  width: 210mm;\n  height: 296.9mm;\n  font-family: \"Istok Web\",\"Helvetica Neue\",Helvetica,Arial,sans-serif; }\n\n.sass {\n  font-family: monospace;\n  white-space: nowrap; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 619:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n@page {\n  size: A4;\n  margin: 0; }\n\n@page {\n  .quotation {\n    margin-top: 20mm;\n    margin-bottom: 20mm; } }\n\n@page :first {\n  .quotation {\n    margin-top: 0; } }\n\n* {\n  overflow: visible; }\n\nhtml, body {\n  -webkit-print-color-adjust: exact; }\n\nbody {\n  margin: 0; }\n\n@media print {\n  html, body {\n    background-color: #f8fffd; } }\n\n.invoice {\n  width: 210mm;\n  height: 296.9mm;\n  font-family: \"Istok Web\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  background-color: #f8fffd;\n  overflow: hidden;\n  margin: 0 auto;\n  font-family: \"Istok Web\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  -webkit-print-color-adjust: exact;\n  /*app-currency {\r\n    padding: 0 20px 0 140px;\r\n  }*/\n  /*tr.add td:last-child,*/\n  /*tr.total td:last-child,*/\n  /*td.euro {\r\n    padding-left: 10px;\r\n    width: 150px;\r\n    text-align: right;\r\n    font-size: 16px;\r\n    font-family: 'Droid Sans Mono', monospace;\r\n  }*/\n  /*td.euro:before {\r\n    content: '€ ';\r\n    position: absolute;\r\n    left: 40px;\r\n    !*font-family: 'Istok Web', sans-serif;*!\r\n  }*/ }\n  .invoice.quotation {\n    display: block;\n    overflow: auto;\n    height: auto; }\n  .invoice > div {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1; }\n  .invoice header, .invoice footer {\n    color: #fff;\n    background-color: #f04; }\n  .invoice header {\n    position: relative;\n    padding-top: 30px;\n    margin-bottom: 30pt;\n    overflow: hidden;\n    font-size: 16pt; }\n    .invoice header > * {\n      z-index: 1; }\n    .invoice header p {\n      margin: 0; }\n    .invoice header > canvas {\n      zoom: 3;\n      position: absolute;\n      left: 0;\n      top: 0;\n      z-index: 0; }\n  .invoice footer {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 1 63pt;\n            flex: 0 1 63pt;\n    padding: 0;\n    font-size: 10pt;\n    line-height: 140%;\n    box-shadow: 0 10mm 0 0 #f04;\n    text-align: center; }\n    .invoice footer div {\n      padding-top: 8pt; }\n  .invoice h1 {\n    margin: 0;\n    font-size: 24pt;\n    line-height: 120%; }\n  .invoice h3.payment {\n    margin: 0; }\n  .invoice h1, .invoice h2, .invoice h3, .invoice h4, .invoice h1 a, .invoice h2 a, .invoice h3 a, .invoice h4 a, .invoice th, .invoice label {\n    color: inherit; }\n  .invoice h3, .invoice h4, .invoice h5, .invoice h6 {\n    margin: 4px 0 8px; }\n    .invoice h3 + br, .invoice h4 + br, .invoice h5 + br, .invoice h6 + br {\n      display: none; }\n    .invoice h3 + table, .invoice h4 + table, .invoice h5 + table, .invoice h6 + table {\n      margin-top: 5mm;\n      margin-bottom: 10mm; }\n  .invoice .client {\n    color: #000;\n    max-width: 55%; }\n  .invoice small {\n    font-size: 80%;\n    line-height: 140%; }\n  .invoice small p {\n    margin: 0; }\n  .invoice .wrapper {\n    position: relative;\n    clear: both;\n    width: 100%; }\n  .invoice .block {\n    padding: 10px 0 40px; }\n  .invoice .left {\n    float: left; }\n  .invoice .right {\n    float: right; }\n  .invoice .text-left {\n    text-align: left; }\n  .invoice .text-right {\n    text-align: right; }\n  .invoice .clearfix:after {\n    clear: both; }\n  .invoice .clearfix:before, .invoice .clearfix:after {\n    display: table;\n    content: ' '; }\n  .invoice .page {\n    position: relative;\n    width: 80%;\n    margin: 0 auto; }\n  .invoice dl {\n    display: block; }\n  .invoice dt, .invoice dd {\n    display: inline-block;\n    margin: 0;\n    vertical-align: top; }\n  .invoice dl.list dt {\n    width: 30%;\n    font-weight: bold; }\n  .invoice dl.list dd {\n    width: 70%; }\n  .invoice dl.main {\n    margin-top: 10mm;\n    font-size: 18px;\n    font-weight: bold; }\n    .invoice dl.main dt {\n      width: 15%; }\n    .invoice dl.main dd {\n      width: 85%; }\n  .invoice table {\n    width: 100%;\n    padding: 20px;\n    border-collapse: collapse;\n    border: none;\n    line-height: 160%;\n    background-color: transparent !important; }\n    .invoice table * {\n      background-color: inherit !important; }\n  .invoice table tbody, .invoice table th, .invoice table td {\n    border: 0; }\n  .invoice th:nth-child(1) {\n    width: 50%; }\n  .invoice th:nth-child(2) {\n    width: 25%; }\n  .invoice th:nth-child(3) {\n    width: 25%; }\n  .invoice tr.separate,\n  .invoice tr.add {\n    height: 10pt; }\n  .invoice tr.separate td:before,\n  .invoice tr.add td.line:before {\n    content: '';\n    display: block;\n    width: 100%;\n    height: .8pt;\n    background-color: #f04; }\n  .invoice tr.add td:last-child:after {\n    content: '+';\n    position: absolute;\n    top: -6pt;\n    right: -14pt;\n    color: #f04; }\n  .invoice td, .invoice th {\n    padding-right: 20px; }\n    .invoice td:first-child, .invoice th:first-child {\n      padding-right: 0; }\n  .invoice .quotation tr.total td:last-child {\n    padding-right: 15px; }\n  .invoice th {\n    font-size: 16px;\n    text-align: right; }\n  .invoice td {\n    position: relative;\n    /*border: 1px solid rgba(0,0,0,0.01);*/ }\n  .invoice app-currency {\n    width: 80%;\n    float: right;\n    font-family: 'Droid Sans Mono', monospace; }\n  .invoice .total {\n    height: 40pt; }\n    .invoice .total app-currency {\n      display: block;\n      width: 55%;\n      margin: 0 auto;\n      float: none;\n      -webkit-transform: translateX(18pt);\n              transform: translateX(18pt);\n      font-weight: bold;\n      font-size: 20px;\n      text-align: center; }\n    .invoice .total td:last-child:before {\n      left: 90px;\n      position: static; }\n    .invoice .total td:last-child:after {\n      content: '';\n      display: block;\n      position: absolute;\n      left: 0;\n      top: -8px;\n      width: 95%;\n      height: 100%;\n      margin-left: 5%;\n      border: 1px solid #f04;\n      border-top: 0; }\n  .invoice #logo {\n    position: absolute;\n    right: -40pt;\n    top: -9pt;\n    /*transform: translateY(-4px) scale(9) translateX(10%);*/\n    /*transform: translateY(-4px) scale(7.8) translateX(10%);*/ }\n  .invoice #logo path {\n    fill: #f8fffd; }\n  .invoice .quotation-copy {\n    margin-top: 20px;\n    margin-bottom: 40px; }\n  .invoice .avoid-break {\n    page-break-inside: avoid; }\n  .invoice .page-break {\n    page-break-before: always;\n    position: relative; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 626:
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\r\n<main class=\"container center-block\" role=\"main\">\r\n  <h1 *ngIf=\"heading\">{{heading}}</h1>\r\n  <router-outlet></router-outlet>\r\n</main>\r\n<app-footer></app-footer>"

/***/ }),

/***/ 627:
/***/ (function(module, exports) {

module.exports = "<span [innerHTML]=\"amount | currencyFormat:'' | safeHtml\"></span>\r\n<span class=\"chunk\"><span class=\"decimal\"></span></span>"

/***/ }),

/***/ 628:
/***/ (function(module, exports) {

module.exports = "<template ngFor let-item [ngForOf]=\"list\">\r\n  <dt><label for=\"faq{{item.index}}\" [innerHTML]=\"item.dt | safeHtml\"></label></dt>\r\n  <input name=\"{{name}}\" id=\"faq{{item.index}}\" type=\"radio\" class=\"visually-hidden\"/>\r\n  <dd [innerHTML]=\"item.dd | safeHtml\"></dd>\r\n</template>\r\n<div data-list>\r\n  <ng-content></ng-content>\r\n</div>"

/***/ }),

/***/ 629:
/***/ (function(module, exports) {

module.exports = "<footer><small>v1.0.2</small></footer>"

/***/ }),

/***/ 630:
/***/ (function(module, exports) {

module.exports = "<header>\r\n  <nav>\r\n    <ul class=\"list-unstyled list-inline\">\r\n      <li>\r\n        <input id=\"hamburger\" type=\"checkbox\" class=\"visually-hidden\" [(ngModel)]=\"dropped\" />\r\n        <label for=\"hamburger\"><span></span></label>\r\n        <ul class=\"list-unstyled list-inline\">\r\n          <li><a routerLink=\"/\" [routerLinkActive]=\"[active]\" [routerLinkActiveOptions]=\"{exact: true}\">home</a></li>\r\n          <li class=\"drop\">\r\n            <label for=\"drop1\"><a routerLink=\"/overview\" [routerLinkActive]=\"[active]\">overview</a></label>\r\n            <input id=\"drop1\" type=\"checkbox\" class=\"visually-hidden\" />\r\n            <ul>\r\n              <li><a routerLink=\"/overview/quarter\" [routerLinkActive]=\"[active]\">quarter</a></li>\r\n            </ul>\r\n          </li>\r\n          <li><a routerLink=\"/clients\" [routerLinkActive]=\"[active]\">clients</a></li>\r\n          <li class=\" drop\">\r\n            <label for=\"drop2\"><a routerLink=\"/settings\" [routerLinkActive]=\"[active]\">settings</a></label>\r\n            <input id=\"drop2\" type=\"checkbox\" class=\"visually-hidden\" />\r\n            <ul>\r\n              <li><a routerLink=\"/data\" [routerLinkActive]=\"[active]\">data</a></li>\r\n              <li><a routerLink=\"/copy\" [routerLinkActive]=\"[active]\">copy</a></li>\r\n            </ul>\r\n          </li>\r\n          <li><a routerLink=\"/about\" [routerLinkActive]=\"[active]\">about</a></li>\r\n        </ul>\r\n      </li>\r\n      <li class=\"buttons\">\r\n        <app-saveable-buttons></app-saveable-buttons>\r\n      </li>\r\n    </ul>\r\n  </nav>\r\n</header>"

/***/ }),

/***/ 631:
/***/ (function(module, exports) {

module.exports = "<div class=\"interpolationui\" [ngClass]=\"{'ui-visible':uiVisible}\" (mouseenter)=\"onMouseEnter($event)\" (mouseleave)=\"onMouseLeave($event)\">\r\n  <textarea [(ngModel)]=\"value\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\"></textarea>\r\n  <div class=\"ui\">\r\n    <input id=\"dummynone{{id}}\" name=\"dummy{{id}}\" type=\"radio\" class=\"visually-hidden\" />\r\n    <ul class=\"list-inline dummy-model\" >\r\n      <li *ngFor=\"let dummy of dummyModel | object\" class=\"list-inline-item\">\r\n        <input id=\"dummy{{id}}{{dummy.key}}\" name=\"dummy{{id}}\" type=\"radio\" class=\"visually-hidden\" />\r\n        <label for=\"dummy{{id}}{{dummy.key}}\" class=\"btn btn-sm\">{{dummy.key}}</label>\r\n        <ul class=\"list-inline\">\r\n          <li *ngFor=\"let keyval of dummy.value | object:false\" class=\"list-inline-item\">\r\n            <label for=\"dummynone{{id}}\" class=\"btn btn-sm\" (click)=\"onClickDummy(dummy.key,keyval.key)\">{{keyval.key}}</label>\r\n          </li>\r\n        </ul>\r\n      </li>\r\n    </ul>\r\n    <!--<strong><small [innerHTML]=\"interpolate(__(value||'')) | safeHtml\"></small></strong>-->\r\n    <!--<strong><small [innerHTML]=\"interpolate(value||'') | safeHtml\"></small></strong>-->\r\n    <strong><small [innerHTML]=\"parse(value||'') | safeHtml\"></small></strong>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 632:
/***/ (function(module, exports) {

module.exports = "<ul>\r\n  <li class=\" buttons btn-group\">\r\n    <button *ngFor=\"let _lang of config?.langs\" (click)=\"setLang(_lang)\" class=\"{{_lang===config.lang?'btn-secondary':''}} lang-{{_lang}}\">{{_lang}}</button>\r\n  </li>\r\n</ul>"

/***/ }),

/***/ 633:
/***/ (function(module, exports) {

module.exports = "<span>\r\n  <button *ngIf=\"isSaveable\" (click)=\"onSave()\" [disabled]=\"!isModelDirty\" class=\"btn-primary\">save</button>\r\n  <button *ngIf=\"isSaveable\" (click)=\"onRevert()\" [disabled]=\"!isModelDirty\" class=\"btn-primary\">revert</button>\r\n  <button *ngIf=\"isDeletable\" (click)=\"onDelete()\" class=\"btn-warning\">delete</button>\r\n</span>\r\n"

/***/ }),

/***/ 634:
/***/ (function(module, exports) {

module.exports = "<section>\r\n  <h1 id=\"fooinvoice\">Fooinvoice</h1>\r\n  <p>This invoicing application stores all your data on your local machine.</p>\r\n  <p>Your local documents are not shared between different browsers or computers.</p>\r\n</section>\r\n<section>\r\n  <h2 id=\"gettingstarted\">Getting Started</h2>\r\n  <p>You can head to ... and start creating invoices.\r\n  Or you can make a local installation.</p>\r\n  <h3 id=\"runningonlocalhost\">Running on localhost</h3>\r\n  <p>To get the application running you only need NodeJS, npm and GIT. If you don't know what those are you might be better off simply using the online version, your data will be just as safe.</p>\r\n  <p><code>git clone https://github.com/Sjeiti/invoice.git</code></p>\r\n  <p><code>npm i</code></p>\r\n  <p><code>npm run start</code></p>\r\n</section>\r\n<section>\r\n  <h2>faq</h2>\r\n  <app-foldable-definition>\r\n    <dt>Wait, this app is online in a browser. How is my private data not online?</dt>\r\n    <dd>Every site can access something called LocalStorage which resides on your local machine. This is where your data is stored. Websites can never access the LocalStorage of another website. Never will data be sent from your computer to the server. The only network communication is the application logic being sent from the server to your computer. All your private data remains on your own computer.</dd>\r\n    \r\n    <dt>Is this safe?</dt>\r\n    <dd>Storing your data on your local machine is safer than sending and receiving it over the internet. And since LocalStorage is so called origin-specific, only this website can read this websites LocalStorage. But you can also run this on localhost if your tech savvy enough. It is as safe as you treat your computers security.</dd>\r\n    \r\n    <dt>Don't I have to login with a username and password?</dt>\r\n    <dd>Logins are useful for server authentication. But since your data is stored on your local machine and not on a server, no authentication is needed.</dd>\r\n    \r\n    <dt>How can I access my data from different machines?</dt>\r\n    <dd>Since the data is stored locally you can only access it from one computer. However you can save and/or import the data from the <a href=\"/settings\">settings page</a>. You could save it on a usb stick to transfer the data to a different computer.</dd>\r\n    \r\n    <dt>How do I remove all my data?</dt>\r\n    <dd>Just clear the localStorage, or push the button on the <a href=\"/settings\">settings page</a>.</dd>\r\n    \r\n    <dt>Why?</dt>\r\n    <dd>\r\n      <p>Being self-employed all my life means I've been sending invoices for quite a while. I've seen a lot of invoicing software/services but was never really satisfied.\r\n      So I created my own:</p>\r\n      <ul>\r\n      <li>no cloud based data, everything is saved on your local machine, nothing is sent to a server</li>\r\n      <li>invoices are well designed and customizable</li>\r\n      <li>its easy to use</li>\r\n      <li>its open-source</li>\r\n      <li>its free</li>\r\n      <li>you can use the online version or run a local copy</li>\r\n      </ul>\r\n      <p>I cleaned it up a bit because I thought you might like it.</p>\r\n    </dd>\r\n  </app-foldable-definition>\r\n</section>"

/***/ }),

/***/ 635:
/***/ (function(module, exports) {

module.exports = "<h2>{{client?.name}}</h2>\r\n\r\n<section>\r\n  <dl class=\"row\">\r\n    <dt class=\"col-3 text-right\">name</dt><dd class=\"col-9\"><input [(ngModel)]=\"client.name\" (ngModelChange)=\"onNgModelChanged()\" /></dd>\r\n    <dt class=\"col-3 text-right\">address</dt><dd class=\"col-9\"><input [(ngModel)]=\"client.address\" (ngModelChange)=\"onNgModelChanged()\" /></dd>\r\n    <dt class=\"col-3 text-right\">city</dt><dd class=\"col-9\"><input [(ngModel)]=\"client.city\" (ngModelChange)=\"onNgModelChanged()\" /></dd>\r\n    <dt class=\"col-3 text-right\">contact</dt><dd class=\"col-9\"><input [(ngModel)]=\"client.contact\" (ngModelChange)=\"onNgModelChanged()\" /></dd>\r\n    <dt class=\"col-3 text-right\">nr</dt><dd class=\"col-9\"><input [(ngModel)]=\"client.nr\" (ngModelChange)=\"onNgModelChanged()\" type=\"number\" /></dd>\r\n    <dt class=\"col-3 text-right\">paymentterm</dt><dd class=\"col-9\"><input [(ngModel)]=\"client.paymentterm\" (ngModelChange)=\"onNgModelChanged()\" type=\"number\" /></dd>\r\n    <dt class=\"col-3 text-right\">phone</dt><dd class=\"col-9\"><input [(ngModel)]=\"client.phone\" (ngModelChange)=\"onNgModelChanged()\" /></dd>\r\n    <dt class=\"col-3 text-right\">postbox</dt><dd class=\"col-9\"><input [(ngModel)]=\"client.postbox\" (ngModelChange)=\"onNgModelChanged()\" /></dd>\r\n    <dt class=\"col-3 text-right\">zipcode</dt><dd class=\"col-9\"><input [(ngModel)]=\"client.zipcode\" (ngModelChange)=\"onNgModelChanged()\" /></dd>\r\n    <dt class=\"col-3 text-right\">zippost</dt><dd class=\"col-9\"><input [(ngModel)]=\"client.zippost\" (ngModelChange)=\"onNgModelChanged()\" /></dd>\r\n  </dl>\r\n</section>\r\n\r\n<section class=\"clearfix\">\r\n  <div class=\"clearfix\">\r\n    <h2 class=\"float-left\">projects</h2>\r\n    <button (click)=\"onAddProject()\" class=\"btn-primary float-right\">add project</button>\r\n  </div>\r\n  <ul class=\"list-unstyled\">\r\n    <li *ngFor=\"let project of client?.projects\">\r\n      <!--<a routerLink=\"/client/{{clientNr}}/{{project.invoiceNr}}\">{{project.invoiceNr}} {{project.description}}</a>-->\r\n      <a routerLink=\"{{project.uri}}\">{{project.invoiceNr}} {{project.description}}</a>\r\n    </li>\r\n  </ul>\r\n</section>"

/***/ }),

/***/ 636:
/***/ (function(module, exports) {

module.exports = "<div class=\"float-right\">\r\n  <button (click)=\"onAddClient()\" class=\"btn-primary\">add client</button>\r\n</div>\r\n<section>\r\n  <input [(ngModel)]=\"nameFilter\" class=\"w-25\" />\r\n  <ul class=\"list-unstyled\">\r\n    <li *ngFor=\"let client of clients | name:nameFilter | arraySort:'-lastProjectDate' \">\r\n      <a routerLink=\"/client/{{client.nr}}\">{{client.name}}</a>\r\n    </li>\r\n  </ul>\r\n</section>"

/***/ }),

/***/ 637:
/***/ (function(module, exports) {

module.exports = "<app-lang></app-lang>\r\n<section>\r\n  <dl class=\"row\">\r\n    <template ngFor let-item [ngForOf]=\"copySorted\">\r\n      <dt>{{item.name}}</dt>\r\n      <dd>\r\n        <app-interpolationui [(ngModel)]=\"item.value[lang]\" (ngModelChange)=\"onNgModelChanged()\" localise></app-interpolationui>\r\n        <button *ngIf=\"keyDeletable(item.name)\" (click)=\"onRemoveCopy(item.name)\">&#10006;</button>\r\n      </dd>\r\n    </template>\r\n  </dl>\r\n  <button (click)=\"onAdd()\" class=\"btn-primary\">add</button>\r\n</section>\r\n"

/***/ }),

/***/ 638:
/***/ (function(module, exports) {

module.exports = "<section>\r\n  <dl class=\"row\">\r\n    <template ngFor let-item [ngForOf]=\"personal | object\">\r\n      <dt>{{item.key}}</dt><dd><input [(ngModel)]=\"personal[item.key]\" (ngModelChange)=\"onNgModelChanged()\" /></dd>\r\n    </template>\r\n  </dl>\r\n</section>\r\n"

/***/ }),

/***/ 639:
/***/ (function(module, exports) {

module.exports = "<p>\r\n  error404 works!\r\n</p>\r\n"

/***/ }),

/***/ 640:
/***/ (function(module, exports) {

module.exports = "<section class=\"jumbotron\">\r\n  <p>This invoicing application stores all your data on your local machine.<br/>\r\n  Because all your data are belongs to you.</p>\r\n</section>\r\n<div class=\"row\">\r\n  <section class=\"col-12 col-md-7\">\r\n    <h2>Open invoices</h2>\r\n    <p *ngIf=\"projects.length===0\"><em>You currently have no open invoices... yay!</em></p>\r\n    <table *ngIf=\"projects.length>0\">\r\n      <thead><tr>\r\n        <th data-order-key=\"paid\" width=\"10%\">paid</th>\r\n        <th data-order-key=\"client\" width=\"60%\">client</th>\r\n        <th data-order-key=\"totalIncDiscounted\" width=\"20%\">amount</th>\r\n        <th width=\"20%\">actions</th>\r\n      </tr></thead>\r\n      <tbody>\r\n        <tr\r\n            *ngFor=\"let project of projects | arrayFilter:'!paid' | arraySort:'-timestampLatest' \"\r\n            class=\"row-select ng-scope\"\r\n            [ngClass]=\"{'row-select':true,'alert-paid':project.paid,'alert-late':project.isLate,'alert-pending':project.isPending}\"\r\n            title=\"{{project.invoiceNr}} {{project.date | date:dateFormat}} {{project.description}}\"\r\n        >\r\n          <td>\r\n            <label class=\"checkbox\">\r\n              <input [(ngModel)]=\"project.paid\" (change)=\"onPaidChange()\" type=\"checkbox\" /><span></span>\r\n            </label>\r\n          </td>\r\n          <td><a routerLink=\"/client/{{project.clientNr}}/{{project.invoiceNr}}\">{{modelService.getClientByNr(project.clientNr).name}}</a></td>\r\n          <td class=\"text-right\">{{project.totalIncDiscounted | currency:'EUR':true}}</td>\r\n          <td><button (click)=\"onAddReminder(project)\" class=\"btn btn-sm btn-primary\">Add reminder</button></td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </section>\r\n  <section class=\"col-12 col-md-5\">\r\n    <p>What do you want to do:</p>\r\n    <p><button (click)=\"onAddClient()\" class=\"btn btn-primary\">Create a new client</button></p>\r\n    <p><button (click)=\"onAddProjectForLatestClient()\" *ngIf=\"latestClient\" class=\"btn btn-primary\">Create project for {{latestClient.name}}</button></p>\r\n    <p><button (click)=\"onCloneLatestProject()\" *ngIf=\"latestProject\" class=\"btn btn-primary\">Clone project {{latestProject.description}}</button></p>\r\n    <p><a href=\"/overview/quarter\" class=\"btn btn-primary\">See current quarter</a></p>\r\n  </section>\r\n</div>"

/***/ }),

/***/ 641:
/***/ (function(module, exports) {

module.exports = "<div class=\"invoice-options\">\r\n  <script type=\"text/javascript\">console.log('script')</script>\r\n  <a routerLink=\"/client/{{client?.nr}}/{{project?.invoiceNr}}\" class=\"btn btn-default\">back</a>\r\n  <button (click)=\"onClickPrint()\" class=\"btn-primary\" [disabled]=\"!pageReady\">print</button>\r\n  <a (click)=\"onClickDownload($event)\" class=\"btn btn-sm btn-primary\" ngClass=\"{disabled:!pageReady}\" href=\"{{dataUrl}}\" download=\"{{invoiceName}}.png\">download</a>\r\n  \r\n  <app-lang class=\"float-right\"></app-lang>\r\n</div>\r\n<section>\r\n  <div class=\"invoice-shade\"><div></div></div>\r\n  <app-print-invoice [client]=\"client\" [project]=\"project\" [invoice]=\"invoice\"></app-print-invoice>\r\n</section>\r\n<iframe class=\"visually-hidden\"></iframe>"

/***/ }),

/***/ 642:
/***/ (function(module, exports) {

module.exports = "<section>\r\n  <table>\r\n    <thead><tr>\r\n      <th data-order-key=\"paid\" width=\"5%\">paid</th>\r\n      <th data-order-key=\"invoiceNr\" width=\"10%\">nr</th>\r\n      <th data-order-key=\"date\" width=\"10%\">date</th>\r\n      <th data-order-key=\"changed\" width=\"10%\">changed</th>\r\n      <th data-order-key=\"client\" width=\"35%\">client</th>\r\n      <th data-order-key=\"description\" width=\"40%\">description</th>\r\n      <th data-order-key=\"totalIncDiscounted\" width=\"10%\">amount</th>\r\n    </tr></thead>\r\n    <tbody>\r\n      <tr *ngFor=\"let project of projects | arraySort:'paid':'-timestampLatest'\" class=\"row-select ng-scope\" [ngClass]=\"{'row-select':true,'alert-paid':project.paid,'alert-late':project.isLate,'alert-pending':project.isPending}\">\r\n        <td>\r\n          <label class=\"checkbox\">\r\n            <input [(ngModel)]=\"project.paid\" (change)=\"onPaidChange()\" type=\"checkbox\" /><span></span>\r\n          </label>\r\n        </td>\r\n        <td><a routerLink=\"/client/{{project.clientNr}}/{{project.invoiceNr}}\">{{project.invoiceNr}}</a></td>\r\n        <td><small>{{project.date | date:dateFormat}}</small></td>\r\n        <td><small>{{project.dateLatest | date:dateFormat}}</small></td>\r\n        <td>{{modelService.getClientByNr(project.clientNr).name}}</td>\r\n        <td>{{project.description}}</td>\r\n        <td class=\"text-right\">{{project.totalIncDiscounted | currency:'EUR':true}}</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</section>\r\n"

/***/ }),

/***/ 643:
/***/ (function(module, exports) {

module.exports = "<button (click)=\"clone(project)\" class=\"btn-default float-right\">clone</button>\r\n<h2>{{project?.description}}</h2>\r\n<section>\r\n  <dl class=\"row\">\r\n    <dt>client</dt><dd><a routerLink=\"/client/{{client?.nr}}\">{{client?.name}}</a></dd>\r\n    <dt>description</dt><dd><input [(ngModel)]=\"project.description\" (ngModelChange)=\"onNgModelChanged()\" /></dd>\r\n    <!--<dt>invoiceNr</dt><dd><input [(ngModel)]=\"project.invoiceNr\" (ngModelChange)=\"onNgModelChanged()\" /></dd>-->\r\n    <dt>invoiceNr</dt><dd>{{project?.invoiceNr}}</dd>\r\n    <dt>hourlyRate</dt><dd><input [(ngModel)]=\"project.hourlyRate\" (ngModelChange)=\"onNgModelChanged()\" type=\"number\" /></dd>\r\n    <dt>discount</dt><dd><input [(ngModel)]=\"project.discount\" (ngModelChange)=\"onNgModelChanged()\" type=\"number\" /></dd>\r\n    <dt>discounted rate</dt><dd>{{project.hourlyRate - project.hourlyRate*project.discount*0.01}}</dd>\r\n    <dt>paid</dt><dd><label class=\"checkbox\"><input [(ngModel)]=\"project.paid\" type=\"checkbox\" (ngModelChange)=\"onNgModelChanged()\" /><span></span></label></dd>\r\n  </dl>\r\n</section>\r\n\r\n<section>\r\n  <button (click)=\"onAddLine()\" class=\"btn-primary float-right\">add line</button>\r\n  <h3>lines</h3>\r\n  <table>\r\n    <thead><tr>\r\n      <th>description</th>\r\n      <th><span class=\"hidden-xs-down\">hours</span><span class=\"hidden-sm-up\">hrs</span></th>\r\n      <th></th>\r\n      <th>amount</th>\r\n      <th>VAT</th>\r\n      <th></th>\r\n    </tr></thead>\r\n    <tbody><tr *ngFor=\"let line of project?.lines\">\r\n      <td><input [(ngModel)]=\"line.description\" (ngModelChange)=\"onNgModelChanged()\" /></td>\r\n      <td><input [(ngModel)]=\"line.hours\" (ngModelChange)=\"onNgModelChanged()\" type=\"number\" /></td>\r\n      <td><small (dblclick)=\"onClickCalculation(project,line)\"><app-currency [amount]=\"line.hours*project.hourlyRateDiscounted\"></app-currency></small></td>\r\n      <td><input [(ngModel)]=\"line.amount\" (ngModelChange)=\"onNgModelChanged()\" type=\"number\" /></td>\r\n      <td>\r\n        <select [(ngModel)]=\"line.vat\" (ngModelChange)=\"onNgModelChanged()\">\r\n          <option *ngFor=\"let vat of INVOICE.VAT | object\" [value]=\"vat.value\">{{vat.value}}</option>\r\n        </select>\r\n      </td>\r\n      <td><button (click)=\"onRemoveLine(line)\" class=\"btn-default\">&#10006;</button></td>\r\n    </tr></tbody>\r\n    <tfoot><tr>\r\n      <td><strong>Total ex</strong></td>\r\n      <td>{{project.totalHours}}</td>\r\n      <td><small><app-currency [amount]=\"project.totalHours*project.hourlyRateDiscounted\"></app-currency></small></td>\r\n      <td><app-currency [amount]=\"project.total\"></app-currency></td>\r\n      <td></td>\r\n      <td></td>\r\n    </tr><tr>\r\n      <td><strong>Total incl</strong></td>\r\n      <td></td>\r\n      <td></td>\r\n      <td><app-currency [amount]=\"project.totalIncDiscounted\"></app-currency></td>\r\n      <td></td>\r\n      <td></td>\r\n    </tr></tfoot>\r\n  </table>\r\n</section>\r\n\r\n<section>\r\n  <button (click)=\"onAddInvoice()\" class=\"btn-primary float-right\">add invoice</button>\r\n  <h3>invoices</h3>\r\n  <ul class=\"list-unstyled\">\r\n    <li *ngFor=\"let invoice of project?.invoices; let i = index\" class=\"row\">\r\n      <div class=\"col-3 col-md-3\"><input [(ngModel)]=\"invoice.date\" (ngModelChange)=\"onNgModelChanged()\" type=\"date\" /></div>\r\n      <div class=\"col-3 col-md-2\"><a routerLink=\"/client/{{client.nr}}/{{project.invoiceNr}}/{{invoice.type}}{{i!==0?'/'+i:''}}\" class=\"btn btn-sm btn-primary\">{{invoice.type}} {{i!==0?i:''}}</a></div>\r\n      <div class=\"col-4 col-md-2 form-inline\">\r\n        <label *ngIf=\"i>0\" class=\"checkbox\"><input [(ngModel)]=\"invoice.interest\" type=\"checkbox\" /><span title=\"add interest\"></span></label>\r\n        <label *ngIf=\"i>1\" class=\"checkbox\"><input [(ngModel)]=\"invoice.exhortation\" type=\"checkbox\" /><span title=\"exhortation\"></span></label>\r\n      </div>\r\n      <div class=\"col-2 col-md-5\"><button (click)=\"onRemoveInvoice(invoice)\" class=\"btn-default\">&#10006;</button></div>\r\n    </li>\r\n  </ul>\r\n</section>\r\n\r\n<section>\r\n  <a href=\"#\" class=\"btn btn-sm btn-primary float-right\">show quotation</a>\r\n  <h3>quotation</h3>\r\n  <dl class=\"row\">\r\n    <dt class=\"col-6\">quotationBefore</dt><dd class=\"col-6\"><textarea [(ngModel)]=\"project.quotationBefore\"></textarea></dd>\r\n    <dt class=\"col-6\">quotationAfter</dt><dd class=\"col-6\"><textarea [(ngModel)]=\"project.quotationAfter\"></textarea></dd>\r\n    <dt class=\"col-6\">quotationDate</dt><dd class=\"col-6\"><input [(ngModel)]=\"project.quotationDate\" (ngModelChange)=\"onNgModelChanged()\" type=\"date\" /></dd>\r\n  </dl>\r\n</section>"

/***/ }),

/***/ 644:
/***/ (function(module, exports) {

module.exports = "<header>\r\n  <nav>\r\n    <ul class=\"list-unstyled list-inline\">\r\n      <li class=\"list-inline-item {{y===year?'current':''}}\" *ngFor=\"let y of years\"><a routerLink=\"/overview/quarter/{{y}}\">{{y}}</a></li>\r\n    </ul>\r\n  </nav>\r\n</header>\r\n<section *ngFor=\"let quarter of quarters; let i = index\">\r\n  <h3 class=\"float-left\">quarter {{i+1}}</h3>\r\n  <button (click)=\"onClickCsv(quarter)\" class=\"btn btn-secondary float-right\">copy csv data</button>\r\n  <table>\r\n    <thead><tr>\r\n      <th width=\"10%\" data-order-key=\"invoiceNr\">nr</th>\r\n      <th width=\"10%\" data-order-key=\"date\">date</th>\r\n      <th width=\"20%\" data-order-key=\"client\">client</th>\r\n      <th width=\"33%\" data-order-key=\"description\">description</th>\r\n      <th width=\"9%\" data-order-key=\"totalDiscounted\" class=\"text-right\">ex</th>\r\n      <th width=\"9%\" data-order-key=\"totalVatDiscounted\" class=\"text-right\">VAT</th>\r\n      <th width=\"9%\" data-order-key=\"totalIncDiscounted\" class=\"text-right\">total</th>\r\n    </tr></thead><tbody>\r\n      <tr *ngFor=\"let project of quarter | arraySort:'date'\" class=\"row-select\">\r\n        <td><a routerLink=\"/client/{{project.clientNr}}/{{project.invoiceNr}}\">{{project.invoiceNr}}</a></td>\r\n        <td><small>{{project.date | date:dateFormat}}</small></td>\r\n        <td class=\"text-overflow\">{{modelService.getClientByNr(project.clientNr).name}}</td>\r\n        <td class=\"text-overflow\">{{project.description}}</td>\r\n        <td class=\"text-right\">{{project.totalDiscounted | currency:'EUR':true}}</td>\r\n        <td class=\"text-right\">{{project.totalVatDiscounted | currency:'EUR':true}}</td>\r\n        <td class=\"text-right\">{{project.totalIncDiscounted | currency:'EUR':true}}</td>\r\n      </tr>\r\n    </tbody>\r\n    <tfoot>\r\n      <tr class=\"row-select\">\r\n        <td></td>\r\n        <td></td>\r\n        <td></td>\r\n        <td></td>\r\n        <td class=\"text-right\">{{getTotalDiscounted(quarter) | currency:'EUR':true}}</td>\r\n        <td class=\"text-right\">{{getTotalVatDiscounted(quarter) | currency:'EUR':true}}</td>\r\n        <td class=\"text-right\">{{getTotalIncDiscounted(quarter) | currency:'EUR':true}}</td>\r\n      </tr>\r\n    </tfoot>\r\n  </table>\r\n</section>\r\n<section>\r\n  <table>\r\n    <thead><tr>\r\n      <th width=\"10%\"></th>\r\n      <th width=\"10%\"></th>\r\n      <th width=\"35%\"></th>\r\n      <th width=\"40%\"></th>\r\n      <th data-order-key=\"totalDiscounted\" class=\"text-right\" width=\"10%\">ex</th>\r\n      <th data-order-key=\"totalVatDiscounted\" class=\"text-right\" width=\"10%\">VAT</th>\r\n      <th data-order-key=\"totalIncDiscounted\" class=\"text-right\" width=\"10%\">total</th>\r\n    </tr></thead><tbody>\r\n      <tr>\r\n        <td>[{{totalDiscounted}}]</td>\r\n        <td></td>\r\n        <td></td>\r\n        <td></td>\r\n        <td class=\"text-right\">{{getTotalDiscounted() | currency:'EUR':true}}</td>\r\n        <td class=\"text-right\">{{getTotalVatDiscounted() | currency:'EUR':true}}</td>\r\n        <td class=\"text-right\">{{getTotalIncDiscounted() | currency:'EUR':true}}</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</section>\r\n<textarea #csv class=\"visually-hidden\"></textarea>"

/***/ }),

/***/ 645:
/***/ (function(module, exports) {

module.exports = "<section>\r\n  <dl class=\"row\">\r\n    <dt class=\"name\">Backup</dt>\r\n    <dd>\r\n      <a (click)=\"onClickDownload($event,'config')\" class=\"btn btn-secondary btn-sm\" href=\"#\">config</a>\r\n      <a (click)=\"onClickDownload($event,'data')\" class=\"btn btn-secondary btn-sm\" href=\"#\">data</a>\r\n    </dd>\r\n    <dt class=\"name\">Restore</dt>\r\n    <dd>\r\n      <label class=\"btn btn-secondary btn-sm\" for=\"config\">config</label><input accept=\"application/json, text/json, .json\" type=\"file\" id=\"config\" (change)=\"onChangeRestore($event,'config')\" class=\"visually-hidden\" />\r\n      <label class=\"btn btn-secondary btn-sm\" for=\"data\">data</label><input accept=\"application/json, text/json, .json\" type=\"file\" id=\"data\" (change)=\"onChangeRestore($event,'data')\" class=\"visually-hidden\" />\r\n    </dd>\r\n    <dt class=\"name\">Clear</dt>\r\n    <dd>\r\n      <button (click)=\"onClickClear('config')\" class=\"btn btn-secondary btn-sm\">config</button>\r\n      <button (click)=\"onClickClear('data')\" class=\"btn btn-secondary btn-sm\">data</button>\r\n    </dd>\r\n  </dl>\r\n</section>\r\n<section class=\"float-right\">\r\n  <div class=\"invoice-shade\"><div></div></div>\r\n  <app-print-invoice [client]=\"client\" [project]=\"project\" [invoice]=\"invoice\"></app-print-invoice>\r\n  <app-lang class=\"float-right\"></app-lang>\r\n</section>\r\n<section>\r\n  <dl class=\"row\">\r\n    <dt class=\"name wide\">invoiceCSS</dt><dd>\r\n      <textarea class=\"sass\" rows=\"16\" [(ngModel)]=\"settings.invoiceCSS\" (ngModelChange)=\"onNgModelChanged();onChangeCSS(settings.invoiceCSS)\" (select)=\"onSelectCSS($event)\" (change)=\"onSelectCSS($event)\" (click)=\"onSelectCSS($event)\" (keyup)=\"onSelectCSS($event)\" (blur)=\"onBlurCSS()\"></textarea>\r\n      <label class=\"btn btn-secondary btn-sm\">add image<input accept=\"image/gif, image/jpg, image/jpeg, image/png, .gif, .jpg, .jpeg, .png\" type=\"file\" (focus)=\"onFocusImageInput()\" (change)=\"onChangeImage($event)\" class=\"visually-hidden\" /></label>\r\n    </dd>\r\n    \r\n    <dt class=\"name\">projectNumberTemplate</dt><dd>\r\n      <app-interpolationui [(ngModel)]=\"settings.projectNumberTemplate\" (ngModelChange)=\"onNgModelChanged()\"></app-interpolationui>\r\n    </dd>\r\n    \r\n    <dt class=\"name\">csvTemplate</dt><dd>\r\n      <app-interpolationui [(ngModel)]=\"settings.csvTemplate\" (ngModelChange)=\"onNgModelChanged()\"></app-interpolationui>\r\n    </dd>\r\n    \r\n    <dt class=\"name\">langs</dt><dd>\r\n      <textarea rows=\"4\" [(ngModel)]=\"settings.langs\" (ngModelChange)=\"onNgModelChanged()\"></textarea>\r\n    </dd>\r\n  </dl>\r\n</section>"

/***/ }),

/***/ 646:
/***/ (function(module, exports) {

module.exports = "<div class=\"invoice\">\r\n  <link href='https://fonts.googleapis.com/css?family=Droid+Sans+Mono|Istok+Web:400,400italic,700,700italic' rel='stylesheet' type='text/css'/>\r\n  <style>{{config.invoiceCSS}}</style>\r\n  <!--<div [innerHTML]=\"config.invoiceCSS\"></div>-->\r\n  <header>\r\n    <div class=\"page\">\r\n      <div class=\"wrapper block clearfix\">\r\n        <div id=\"logo\"></div>\r\n        <div class=\"left client\" [innerHTML]=\"parse(__('receiver')) | safeHtml\"></div>\r\n        <div class=\"right text-right\" [innerHTML]=\"parse(__('sender')) | safeHtml\"></div>\r\n      </div>\r\n    </div>\r\n  </header>\r\n  <div class=\"page\">\r\n    <div class=\"wrapper block clearfix\">\r\n      <dl class=\"float-right text-right\">\r\n        <dt>{{__('date')}}</dt>\r\n        <dd>{{invoice.date | date:copy.dateFormat[config.lang]}}</dd>\r\n      </dl>\r\n      <dl class=\"list\">\r\n        <dt>{{invoiceIndex>0?invoice.exhortation?__('exhortation').toUpperCase():invoiceIndex+'e '+__('reminder').toUpperCase():__('invoice').toUpperCase()}}</dt>\r\n        <dd>{{__('number')}} {{project.invoiceNr}}</dd>\r\n      </dl>\r\n      <dl class=\"list\">\r\n        <dt>{{__('concerns')}}</dt>\r\n        <dd>{{project.description}}</dd>\r\n      </dl>\r\n      <small *ngIf=\"invoiceIndex>0&&!invoice.interest\" [innerHTML]=\"parse('reminder1') | safeHtml\"></small>\r\n      <small *ngIf=\"invoiceIndex>0&&invoice.interest&&!invoice.exhortation\" [innerHTML]=\"parse('reminder2') | safeHtml\"></small>\r\n      <small *ngIf=\"invoiceIndex>0&&invoice.interest&&invoice.exhortation\" [innerHTML]=\"parse('exhortation_') | safeHtml\"></small>\r\n    </div>\r\n    <div class=\"wrapper\">\r\n      <h3 class=\"payment\">{{__('payment')}}</h3>\r\n      <table cellspacing=\"0\" cellpadding=\"0\">\r\n        <thead>\r\n        <tr>\r\n          <th></th>\r\n          <th>{{__('amount')}}</th>\r\n          <th>{{__('vat')}}</th>\r\n        </tr>\r\n        </thead>\r\n        <!--lines-->\r\n        <tbody>\r\n        <tr *ngFor=\"let line of project.lines\">\r\n          <td>{{line.description}}</td>\r\n          <td><app-currency [amount]=\"line.amount\"></app-currency></td>\r\n          <td><app-currency [amount]=\"line.amount*line.vat/100\"></app-currency></td>\r\n        </tr>\r\n        </tbody>\r\n        <!--subtotal discount-->\r\n        <tbody *ngIf=\"project.discount!==0\">\r\n        <tr class=\"separate add\"><td colspan=\"3\"></td></tr>\r\n        <tr>\r\n          <td>{{__('subtotal')}}</td>\r\n          <td><app-currency [amount]=\"project.total\"></app-currency></td>\r\n          <td><app-currency [amount]=\"project.totalVat\"></app-currency></td>\r\n        </tr>\r\n        <tr>\r\n          <td>{{__('discount')}} {{project.discount}}%<!-- | number:2--></td>\r\n          <td><app-currency [amount]=\"project.totalDiscount\"></app-currency></td>\r\n          <td><app-currency [amount]=\"project.totalVatDiscount\"></app-currency></td>\r\n        </tr>\r\n        </tbody>\r\n        <!--subtotal no discount-->\r\n        <tbody *ngIf=\"project.discount===0&&project.lines.length>1\">\r\n        <tr class=\"separate add\"><td colspan=\"3\"></td></tr>\r\n        <tr>\r\n          <td>{{__('subtotal')}}</td>\r\n          <td><app-currency [amount]=\"project.total\"></app-currency></td>\r\n          <td><app-currency [amount]=\"project.totalVat\"></app-currency></td>\r\n        </tr>\r\n        </tbody>\r\n        <!--total no interest-->\r\n        <tbody *ngIf=\"!invoice.interest\">\r\n        <tr class=\"separate add\">\r\n          <td colspan=\"3\"></td>\r\n        </tr>\r\n        <tr class=\"total\">\r\n          <td>{{__('total')}}</td>\r\n          <td colspan=\"2\"><app-currency [amount]=\"project.totalIncDiscounted\"></app-currency></td>\r\n        </tr>\r\n        </tbody>\r\n        <!--total interest-->\r\n        <tbody *ngIf=\"invoice.interest\">\r\n        <tr>\r\n          <td>{{__('administrationCosts')}}</td>\r\n          <td><app-currency [amount]=\"personal.administrationCosts\"></app-currency></td>\r\n          <td></td>\r\n        </tr>\r\n        <tr>\r\n          <td>{{__('legalInterest')}} {{personal.interestAmount}}%</td>\r\n          <td><app-currency [amount]=\"project.interest\"></app-currency></td>\r\n          <td></td>\r\n        </tr>\r\n        <tr class=\"separate add\"><td colspan=\"3\"></td></tr>\r\n        <tr class=\"total\">\r\n          <td>{{__('total')}}</td>\r\n          <td colspan=\"2\"><app-currency [amount]=\"project.totalIncDiscountedInterest\"></app-currency></td>\r\n        </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  <footer class=\"wrapper\">\r\n    <div class=\"page\" [innerHTML]=\"parse(__('footer'))\"></div>\r\n  </footer>\r\n</div>"

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return modelDirty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return modelAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return modelAble; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return modelBeforeSave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return modelSaved; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return cssChanged; });
var Signal = signals.Signal;
function signal() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var signal = new Signal();
    if (args.length) {
        signal.memorize = true;
        signal.dispatch.apply(signal, args);
    }
    return signal;
}
var modelDirty = signal(false), modelAction = signal(), // number
modelAble = signal(), // number
modelBeforeSave = signal(), modelSaved = signal(), cssChanged = signal();
Object.assign(modelAction, {
    SAVE: 1,
    REVERT: 2,
    DELETE: 4
});
Object.assign(modelAble, {
    SAVE: 1,
    DELETE: 2
});

//# sourceMappingURL=signals.js.map

/***/ }),

/***/ 915:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(402);


/***/ })

},[915]);
//# sourceMappingURL=main.bundle.js.map