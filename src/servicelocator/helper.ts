function capitalize (str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// this function gets a specific component Class based on a string

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getComponentClass (componentName: string): Promise<any> {
  try {
    const module = await import(`./c_${componentName}`);
    const className = `${capitalize(componentName)}Component`;

    if (className in module) {
      return module[className];
    } else {
      throw new Error(`Class ${className} not found in module c_${componentName}`);
    }
  } catch (error) {
    console.error(`Error loading component: ${error}`);
    throw error;
  }
}
