export const yupSync = (schema, fieldName) => ({
    async validator(_, value) {
      try {
        await schema.validateSyncAt(fieldName, { [fieldName]: value });
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });