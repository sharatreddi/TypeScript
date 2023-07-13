
  // autobind decorator
  export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    //This '_' actually is, a hint for typescript and javascript that you are aware that you are not going to use these values,
    // but you need to accept them because you need the argument they're after
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  }

