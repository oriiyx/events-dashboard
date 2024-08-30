backend:
	@echo "Building backend..."
	@cd backend
	@npm run start:debug

frontend:
	@echo "Building frontend..."
	@cd frontend && npm run dev