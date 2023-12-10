/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { servicioDeteccion } from '../services/deteccion.service';
import { validacionDeteccion } from '../validacion/deteccionV';
export declare class controladorDeteccion {
    private readonly servicioDeteccion;
    constructor(servicioDeteccion: servicioDeteccion);
    create(validacionDeteccion: validacionDeteccion): Promise<import("mongoose").Document<unknown, any, import("../entities/deteccion.entity").Deteccion> & import("../entities/deteccion.entity").Deteccion & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, any, import("../entities/deteccion.entity").Deteccion> & import("../entities/deteccion.entity").Deteccion & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, any, import("../entities/deteccion.entity").Deteccion> & import("../entities/deteccion.entity").Deteccion & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("../entities/deteccion.entity").Deteccion>;
    findOne(id: string): Promise<import("../entities/deteccion.entity").Deteccion>;
    update(id: string, validacionDeteccion: validacionDeteccion): Promise<void>;
    remove(id: string): Promise<string>;
}
