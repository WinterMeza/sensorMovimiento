"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduloDeteccion = void 0;
const common_1 = require("@nestjs/common");
const deteccion_service_1 = require("../services/deteccion.service");
const deteccion_controller_1 = require("../controllers/deteccion.controller");
const mongoose_1 = require("@nestjs/mongoose");
const deteccion_entity_1 = require("../entities/deteccion.entity");
let moduloDeteccion = class moduloDeteccion {
};
moduloDeteccion = __decorate([
    (0, common_1.Module)({
        controllers: [deteccion_controller_1.controladorDeteccion],
        providers: [deteccion_service_1.servicioDeteccion],
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: deteccion_entity_1.Deteccion.name,
                    schema: deteccion_entity_1.esquemaDeteccion
                }])
        ]
    })
], moduloDeteccion);
exports.moduloDeteccion = moduloDeteccion;
//# sourceMappingURL=deteccion.module.js.map