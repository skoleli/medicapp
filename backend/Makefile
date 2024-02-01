
tools/swagger:
	$(call print-target)
	GOBIN=$(CURDIR)/tools go install github.com/go-swagger/go-swagger/cmd/swagger@v0.27.0

.PHONY: install_tools
install_tools: tools/swagger tools/golang-migrate

.PHONY: models
models: tools/swagger
	$(call print-target)
	find ./models -type f -not -name '*_test.go' -delete
	./tools/swagger  generate model DEBUG=1 --spec=docs/api.yaml

.PHONY: lint
lint: $(call print-target)
	golangci-lint run -v --disable structcheck --enable gosec

.PHONY: hardcore-lint
hardcore-lint: $(call print-target)
	golangci-lint run -v --enable-all --disable wrapcheck --disable gomnd

define print-target
	@printf "Executing target: \033[36m$@\033[0m\n"
endef
