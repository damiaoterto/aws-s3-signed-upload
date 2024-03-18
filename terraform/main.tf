module "storage" {
  source = "./modules/storage"

  app_name = var.app_name
  environment = var.environment
}
