import { Module } from '@nestjs/common';
import { servicioDeteccion } from '../services/deteccion.service';
import { controladorDeteccion } from '../controllers/deteccion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Deteccion, esquemaDeteccion } from '../entities/deteccion.entity';

@Module({
    controllers: [controladorDeteccion],
    providers: [servicioDeteccion],
    imports: [
        MongooseModule.forFeature([{
            name: Deteccion.name,
            schema: esquemaDeteccion
        }])
    ]
})
export class moduloDeteccion {}