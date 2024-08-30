class CreateEventDto {
  name: string;
  description: string;
  type: string;
  priority: number;
  published: boolean;
  userId: number;
}

class PatchEventDto {
  name: string;
  description: string;
  type: string;
  priority: number;
  published: boolean;
  userId: number;
}

export { CreateEventDto, PatchEventDto };
