import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { servicioDeteccion } from '../services/deteccion.service';
import { validacionDeteccion } from '../validacion/deteccionV';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Documentación de la entidad Deteccion')
@Controller('Deteccion')
export class controladorDeteccion {
    constructor(private readonly servicioDeteccion: servicioDeteccion) { }

    @Post()
    @ApiResponse({ status: 200, description: 'Datos ingresados correctamente...' })
    @ApiResponse({ status: 500, description: 'Error al ingresar datos' })
    create(@Body() validacionDeteccion: validacionDeteccion) {
        return this.servicioDeteccion.Crear(validacionDeteccion);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Consulta completa de los datos realizada...' })
    findAll() {
        return this.servicioDeteccion.BuscarTodos();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Consulta por ID realizada...' })
    @ApiResponse({ status: 404, description: 'Error al consultar dato mediante ID' })
    findOne(@Param('id') id: string) {
        return this.servicioDeteccion.BuscarUno(id);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Actualización realizada correctamente...' })
    @ApiResponse({ status: 404, description: 'Error al actualizar dato' })
    update(@Param('id') id: string, @Body() validacionDeteccion: validacionDeteccion) {
        return this.servicioDeteccion.Actualizar(id, validacionDeteccion);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Eliminación realizada correctamente...' })
    @ApiResponse({ status: 404, description: 'Error al eliminar dato' })
    remove(@Param('id') id: string) {
        return this.servicioDeteccion.Eliminar(id);
    }
}