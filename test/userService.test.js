const UserService = require("../src/userService");

describe("user service", () => {
  test("deve retornar nome quando usuario existe", async () => {
    const userRepository = {
      findById: jest.fn().mockResolvedValue({ id: 1, name: "Maria" }),
    };
    const service = new UserService(userRepository);

    const nome = await service.getUserName(1);

    expect(nome).toBe("Maria");
    expect(userRepository.findById).toHaveBeenCalledWith(1);
  });

  test("deve lancar erro quando usuario nao existe", async () => {
    const userRepository = {
      findById: jest.fn().mockResolvedValue(null),
    };
    const service = new UserService(userRepository);

    const acao = service.getUserName(99);

    await expect(acao).rejects.toThrow("Usuário não encontrado");
  });
});
