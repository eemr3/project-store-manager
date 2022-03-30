const { expect } = require("mocha");

const ProductsMoel = {
  getAll: () => {},
};

describe("busca todos os produtos", () => {
  const payloadMovie = {
    id: 1,
    name: "Mouse",
    quantity: 40,
  };
  describe("quando o retorno for sucesso", () => {
    it("retorna um objeto", async () => {
      const response = await ProductsMoel.getAll();

      expect(response).to.be.a("object");
    });
  });
});
