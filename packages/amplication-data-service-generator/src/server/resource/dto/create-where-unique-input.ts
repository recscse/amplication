import { builders, namedTypes } from "ast-types";
import { Entity, EntityField, EnumDataType } from "../../../types";
import { NamedClassDeclaration } from "../../../util/ast";
import { createInput } from "./create-input";

export function createWhereUniqueInput(
  entity: Entity,
  entityIdToName: Record<string, string>
): NamedClassDeclaration {
  const fields = entity.fields.filter(isUniqueField);
  return createInput(
    createWhereUniqueInputID(entity.name),
    fields,
    false,
    true,
    entityIdToName
  );
}

export function createWhereUniqueInputID(
  entityName: string
): namedTypes.Identifier {
  return builders.identifier(`${entityName}WhereUniqueInput`);
}

export function isUniqueField(field: EntityField): boolean {
  return field.dataType === EnumDataType.Id;
}
