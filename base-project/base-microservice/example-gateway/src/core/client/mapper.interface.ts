export interface Mapper<FromEntity, ToEntity> {
  from(fromEntity: FromEntity): ToEntity;
}
