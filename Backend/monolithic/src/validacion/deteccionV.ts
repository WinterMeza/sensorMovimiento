import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class validacionDeteccion{
    @ApiProperty()
    @IsNotEmpty({message:"El atributo esta Vacio!"})
    @IsString({message:"El atributo debe ser una Cadena de Caracteres!"})
    nombreDeteccion: string;

    @ApiProperty()
    @IsNotEmpty({message:"El atributo esta Vacio!"})
    @IsNumber()
    latitudDeteccion: number;

    @ApiProperty()
    @IsNotEmpty({message:"El atributo esta Vacio!"})
    @IsNumber()
    longitudDeteccion: number;

    @ApiProperty()
    @IsNotEmpty({message:"El atributo esta Vacio!"})
    @IsString({message:"El atributo debe ser una Cadena de Caracteres!"})
    fechahoraDeteccion: string;

    @ApiProperty()
    @IsNotEmpty({message:"El atributo esta Vacio!"})
    @IsNumber()
    valorDeteccion: number;

    @ApiProperty()
    @IsNotEmpty({message:"El atributo esta Vacio!"})
    @IsString({message:"El atributo debe ser una Cadena de Caracteres!"})
    descripcionDeteccion: string;
}