export interface MapperFromDto<Dto, Model> {
  fromDto(dto: Dto): Model;
}

export interface MapperToDto<Dto, Model> {
  toDto(data: Model): Dto;
}

export interface Mapper<Dto, Model> extends MapperFromDto<Dto, Model>, MapperToDto<Dto, Model> {}
