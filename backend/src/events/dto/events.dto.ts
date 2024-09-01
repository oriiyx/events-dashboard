class CreateEventDto {
  name: string;
  description: string;
  typeId: number;
  priority: number;
  published: boolean;
  userId: number;
}

class PatchEventDto {
  name: string;
  description: string;
  typeId: number;
  priority: number;
  published: boolean;
  userId: number;
}

export { CreateEventDto, PatchEventDto };
