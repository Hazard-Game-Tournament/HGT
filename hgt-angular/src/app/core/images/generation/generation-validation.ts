import { ImageValidationService } from '../validation/image-validation';

export async function validateGeneration(
  validator: ImageValidationService,
  data: any,
  character: unknown,
): Promise<any> {
  if (!data?.validationPending) return data;

  const context = data.validationContext ?? {};

  const validation = await validator.validate({
    character,
    imagePath: data.path,
    currentPrompt:
      context.currentPrompt ||
      data.finalPrompt ||
      '',
    critical: Array.isArray(context.critical)
      ? context.critical
      : [],
  });

  return {
    ...data,
    ...validation,
    validation:
      validation.validation ??
      data.validation ??
      null,
  };
}
