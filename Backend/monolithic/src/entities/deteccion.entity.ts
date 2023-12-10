import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Deteccion {
    @ApiProperty()
    @Prop()
    nombreDeteccion: String;

    @ApiProperty()
    @Prop()
    latitudDeteccion: Number;

    @ApiProperty()
    @Prop()
    longitudDeteccion: Number;

    @ApiProperty()
    @Prop()
    fechahoraDeteccion: String;

    @ApiProperty()
    @Prop()
    valorDeteccion: Number;

    @ApiProperty()
    @Prop()
    descripcionDeteccion: String;
}

export const esquemaDeteccion = SchemaFactory.createForClass(Deteccion)