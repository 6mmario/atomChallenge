export interface GenericResponse<T> {
    mensaje: string;
    detalle: T[] | null;
}