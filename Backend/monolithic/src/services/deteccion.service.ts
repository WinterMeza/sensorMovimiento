import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Deteccion } from '../entities/deteccion.entity';
import { validacionDeteccion } from '../validacion/deteccionV';

@Injectable()
export class servicioDeteccion {
    constructor(
        @InjectModel(Deteccion.name)
        private readonly modeloDeteccion: Model<Deteccion>
    ){}
    
    async Crear(validacionDeteccion: validacionDeteccion){
        try{
            const Deteccion = await this.modeloDeteccion.create(validacionDeteccion)
            return Deteccion;
        } 
        catch(error){
            throw new InternalServerErrorException('Error en el proceso de creacion')
        }
    }

    BuscarTodos(){
        const DatosDeteccion = this.modeloDeteccion.find()
        return DatosDeteccion;
    }

    async BuscarUno(id: string){
        let Mostar: Deteccion;

        if(isValidObjectId(id)){
            Mostar = await this.modeloDeteccion.findById(id)
        }

        if(!Mostar){
            throw new NotFoundException('El elemento no se encuentra dentro de la Base de Datos')
        }
        return Mostar;
    }

    async Actualizar(id: string, validacionDeteccion: validacionDeteccion){
        try{
            const actualizarDeteccion = await this.modeloDeteccion.findById(id)
            await actualizarDeteccion.updateOne(validacionDeteccion)
        }
        catch(error){
            throw new NotFoundException('El elemento no se encuentra dentro de la Base de Datos')
        }
    }

    async Eliminar(id: string){
        try{
            const eliminarDeteccion = await this.modeloDeteccion.findById(id)
            await eliminarDeteccion.deleteOne()
            return "Se ha eliminado con Exito"
        } 
        catch(error){
            throw new NotFoundException('El elemento no se encuntra dentro de la Base de Datos')
        }
    }
}